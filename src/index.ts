import Joi from 'joi'
import {parseDomain, ParseResultType} from 'parse-domain'
import providers, {providerDetails} from './providers'

/**
 * Normalize an email address by removing the dots and address tag.
 *
 * @param {string} email
 * @param {object} [options]
 * @param {boolean} options.forceRemoveDots
 * @param {boolean} options.forceRemoveTags
 * @param {boolean} options.detectProvider - Make a DNS call to detect if the email host provider is one that might
 *        provide email address tags, such as Google Apps for Work. Requires callback on the client.
 * @param {object} options.dns_records - If we already have an array of DNS records for the domain, pass them here so we
 *        dont have to fetch them again.
 * @returns {string}
 */
const normalize = (
	email: string,
	options: {[x: string]: boolean} = {}
): string => {
	// Clean email
	let cleanEmail = email.trim().toLowerCase()

	// Test email syntax
	if (!Joi.string().email().validate(cleanEmail))
		throw new Error(cleanEmail + ' is not a valid email')

	// Destructure email string into user and domain
	let [user, fullDomain] = cleanEmail.split(/@/)

	// Parse domain to identify provider
	// @ts-ignore (there seems to be a problem with parseDomain types)
	const {subDomains, domain, topLevelDomains, type} = parseDomain(fullDomain)

	// Handle no-match for domain
	if (type !== ParseResultType.Listed) return cleanEmail

	// Reconstruct root domain
	let originalRootDomain = domain + '.' + topLevelDomains.join('.')

	// Get provider details
	const providerDetails = Object.values(providers).find(
		(providerDetails: providerDetails) => {
			return providerDetails.domains.includes(originalRootDomain)
		}
	)

	// Handle no provider match for domain
	if (!providerDetails) {
		if (options.detectProvider) {
			// handle DNS lookup
			throw new Error('No DNS lookup has been built yet.')
		} else {
			return cleanEmail
		}
	}

	// Handle username in subdomain
	if (providerDetails.userAsSubdomain && subDomains.length === 1) {
		// If username can be in subdomain and 1 subdomain exists,
		// that means the subdomain certainly is the username.
		// Don't keep the subdomain in the domain, but instead
		// use it as the username
		user = subDomains[0]
	} else if (subDomains.length) {
		// If username is not in subdomain, but a subdomain exists,
		// keep subdomain for the normalized email
		originalRootDomain = subDomains.join('.') + '.' + originalRootDomain
	}

	// Remove periods
	if (providerDetails.periodAliasing) {
		user = user.replace('.', '')
	}

	// Strip hyphen addressing
	if (providerDetails.hyphenAddressing) {
		user = user.split('-')[0]
	}

	// Strip plus addressing
	if (providerDetails.plusAddressing) {
		user = user.split('+')[0]
	}

	// Reconstruct email string
	return user + '@' + originalRootDomain
}

export default normalize
