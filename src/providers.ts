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

/**
 * SOURCES:
 *
 *
 * https://www.spamresource.com/2018/07/reference-omg-domains-list-oath.html
 *
 */

import appleDomains from 'domains/apple'
import fastmailDomains from 'domains/fastmail'
import googleDomains from 'domains/google'
import microsoftDomains from 'domains/microsoft'
import protonmailDomains from 'domains/protonmail'
import rackspaceDomains from 'domains/rackspace'
import verizonDomains from 'domains/verizon'
import yandexDomains from 'domains/yandex'
import zohoDomains from 'domains/zoho'

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
        domains: googleDomains,
    },
    microsoft: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: microsoftDomains,
    },
    verizon: {
        plusAddressing: false,
        hyphenAddressing: true,
        periodAliasing: true,
        userAsSubdomain: false,
        domains: verizonDomains,
    },
    apple: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: appleDomains,
    },
    protonmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: protonmailDomains,
    },
    rackspace: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: rackspaceDomains,
    },
    yandex: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: yandexDomains,
    },
    zoho: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: zohoDomains,
    },
    fastmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: true,
        domains: fastmailDomains,
    },
}

export default providers