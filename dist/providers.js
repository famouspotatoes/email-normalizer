"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apple_1 = __importDefault(require("./domains/apple"));
const fastmail_1 = __importDefault(require("./domains/fastmail"));
const google_1 = __importDefault(require("./domains/google"));
const microsoft_1 = __importDefault(require("./domains/microsoft"));
const protonmail_1 = __importDefault(require("./domains/protonmail"));
const rackspace_1 = __importDefault(require("./domains/rackspace"));
const verizon_1 = __importDefault(require("./domains/verizon"));
const yandex_1 = __importDefault(require("./domains/yandex"));
const zoho_1 = __importDefault(require("./domains/zoho"));
const providers = {
    google: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: true,
        userAsSubdomain: false,
        domains: google_1.default,
    },
    microsoft: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: microsoft_1.default,
    },
    verizon: {
        plusAddressing: false,
        hyphenAddressing: true,
        periodAliasing: true,
        userAsSubdomain: false,
        domains: verizon_1.default,
    },
    apple: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: apple_1.default,
    },
    protonmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: protonmail_1.default,
    },
    rackspace: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: rackspace_1.default,
    },
    yandex: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: yandex_1.default,
    },
    zoho: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: false,
        domains: zoho_1.default,
    },
    fastmail: {
        plusAddressing: true,
        hyphenAddressing: false,
        periodAliasing: false,
        userAsSubdomain: true,
        domains: fastmail_1.default,
    },
};
exports.default = providers;
//# sourceMappingURL=providers.js.map