import * as yup from 'yup';
import { parseDomain, ParseResultType } from 'parse-domain';
import providers from "./providers.js";
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
const normalize = (email, options = {}) => {
    // Clean email.
    const cleanEmail = email.trim().toLowerCase();
    // Test email syntax
    if (!yup.string().email().isValidSync(cleanEmail))
        throw new Error(`${cleanEmail} is not a valid email`);
    // Destructure email string into user and domain.
    let [user, fullDomain] = cleanEmail.split(/@/);
    // Parse domain to identify provider
    const parseResult = parseDomain(fullDomain);
    // Handle no-match for domain
    if (parseResult.type !== ParseResultType.Listed)
        return cleanEmail;
    // Now we can destructure since we know the type is Listed
    const { subDomains, domain, topLevelDomains } = parseResult;
    // Reconstruct root domain (domain has type string | undefined, but we already checked that its valid)
    let originalRootDomain = `${domain}.${topLevelDomains.join('.')}`;
    // Get provider details
    const provider = Object.values(providers).find((details) => {
        return details.domains.includes(originalRootDomain);
    });
    // Handle no provider match for domain
    if (!provider) {
        if (options.detectProvider) {
            // TODO: handle DNS lookup here
            throw new Error('No DNS lookup has been built yet.');
        }
        else {
            return cleanEmail;
        }
    }
    // Destructure provider
    const { userAsSubdomain, periodAliasing, hyphenAddressing, plusAddressing } = provider;
    // Handle username in subdomain
    if (userAsSubdomain && subDomains.length === 1) {
        // If username can be in subdomain and 1 subdomain exists,
        // that means the subdomain certainly is the username.
        // Don't keep the subdomain in the domain, but instead
        // use it as the username
        ;
        [user] = subDomains; // username is first and only subdomain value
    }
    else if (subDomains.length) {
        // If username is not in subdomain, but a subdomain exists,
        // keep subdomain for the normalized email
        originalRootDomain = `${subDomains.join('.')}.${originalRootDomain}`;
    }
    // Remove periods (must use global regex to get all periods)
    if (periodAliasing) {
        user = user.replace(/\./g, '');
    }
    // Strip hyphen addressing
    if (hyphenAddressing) {
        ;
        [user] = user.split('-'); // user is value before -
    }
    // Strip plus addressing
    if (plusAddressing) {
        ;
        [user] = user.split('+'); // user is value before +
    }
    // Reconstruct email
    return `${user}@${originalRootDomain}`;
};
export default normalize;
//# sourceMappingURL=index.js.map