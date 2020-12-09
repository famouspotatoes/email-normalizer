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
    plusAddressing: boolean,
    hyphenAddressing: boolean
    periodAliasing: boolean,
    userAsSubdomain: boolean,
    domains: string[],
}

const providers: Record<string, providerDetails> = {
    google: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: true,
        userAsSubdomain: false,
        domains: [
            'gmail.com',
            'google.com',
            'googlemail.com',
        ],
    },
    microsoft: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'outlook.com',
            'hotmail.com',
            'live.com',
        ],
    },
    yahoo: {
        plusAddressing: false,
        hyphenAddressing: true,
        periodAliasing: true,
        userAsSubdomain: false,
        domains: [
            'yahoo.com',
            'yahoo.com.ar',
            'yahoo.com.au',
            'yahoo.at',
            'yahoo.be/fr',
            'yahoo.be/nl',
            'yahoo.com.br',
            'ca.yahoo.com',
            'qc.yahoo.com',
            'yahoo.com.co',
            'yahoo.com.hr',
            'yahoo.cz',
            'yahoo.dk',
            'yahoo.fi',
            'yahoo.fr',
            'yahoo.de',
            'yahoo.gr',
            'yahoo.com.hk',
            'yahoo.hu',
            'yahoo.co.in/yahoo.in',
            'yahoo.co.id',
            'yahoo.ie',
            'yahoo.co.il',
            'yahoo.it',
            'yahoo.co.jp',
            'yahoo.com.my',
            'yahoo.com.mx',
            'yahoo.ae',
            'yahoo.nl',
            'yahoo.co.nz',
            'yahoo.no',
            'yahoo.com.ph',
            'yahoo.pl',
            'yahoo.pt',
            'yahoo.ro',
            'yahoo.ru',
            'yahoo.com.sg',
            'yahoo.co.za',
            'yahoo.es',
            'yahoo.se',
            'yahoo.ch/fr',
            'yahoo.ch/de',
            'yahoo.com.tw',
            'yahoo.co.th',
            'yahoo.com.tr',
            'yahoo.co.uk',
            'yahoo.com.vn',
        ],
    },
    apple: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'icloud.com',
        ],
    },
    prontonmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'protonmail.ch',
        ],
    },
    rackspace: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'emailsrvr.com',
        ],
    },
    yandex: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'mx.yandex.net',
            'yandex.ru',
        ],
    },
    zoho: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: [
            'zoho.com',
        ],
    },
    fastmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: true,
        domains: [
            'fastmail.com',
            'fastmail.fm',
            'messagingengine.com',
        ],
    },
}

export default providers