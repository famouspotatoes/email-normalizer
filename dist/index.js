"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const parse_domain_1 = require("parse-domain");
const providers_1 = __importDefault(require("./providers"));
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
    const parseResult = parse_domain_1.parseDomain(fullDomain);
    // Handle no-match for domain
    if (parseResult.type !== parse_domain_1.ParseResultType.Listed)
        return cleanEmail;
    // Now we can destructure since we know the type is Listed
    const { subDomains, domain, topLevelDomains } = parseResult;
    // Reconstruct root domain (domain has type string | undefined, but we already checked that its valid)
    let originalRootDomain = `${domain}.${topLevelDomains.join('.')}`;
    // Get provider details
    const provider = Object.values(providers_1.default).find((details) => {
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
// Use module.exports instead of export default so that typescript
// compiles to `module.exports` instead of `exports.default`
module.exports = normalize;
exports.default = normalize;
//# sourceMappingURL=index.js.map