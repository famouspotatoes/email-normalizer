/**
 * This const maps commercial domains to their mail providers
 * since the mail providers typically have the same mail
 * syntax policies for all of their domains.
 *
 * plusAddressing:
 * Addresses can be aliased for tasks with `+string`:
 * realemail+news@domain.com => realemail@domain.com
 *
 * hyphenAddressing:
 * Addresses can be aliased for tasks with `-string`:
 * realemail-news@domain.com => realemail@domain.com
 *
 * periodAliasing:
 * Addresses can be aliased with `.`:
 * real.email@domain.com => realemail@domain.com
 *
 * userAsSubdomain:
 * Addresses can be reorganized accordingly:
 * whatever@realemail.domain.com => realemail@domain.com
 */
export interface providerDetails {
    plusAddressing: boolean;
    hyphenAddressing: boolean;
    periodAliasing: boolean;
    userAsSubdomain: boolean;
    domains: string[];
}
declare const providers: Record<string, providerDetails>;
export default providers;
//# sourceMappingURL=providers.d.ts.map