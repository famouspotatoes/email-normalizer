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
declare const normalize: (email: string, options?: {
    [x: string]: boolean;
}) => string;
export default normalize;
//# sourceMappingURL=index.d.ts.map