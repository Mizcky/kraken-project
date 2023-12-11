/* tslint:disable */
/* eslint-disable */
/**
 * kraken
 * The core component of kraken-project
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: git@omikron.dev
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @type DomainOrNetwork
 * Either an ip address / network or a domain name
 * @export
 */
export type DomainOrNetwork = string;

export function DomainOrNetworkFromJSON(json: any): DomainOrNetwork {
    return DomainOrNetworkFromJSONTyped(json, false);
}

export function DomainOrNetworkFromJSONTyped(json: any, ignoreDiscriminator: boolean): DomainOrNetwork {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...stringFromJSONTyped(json, true) };
}

export function DomainOrNetworkToJSON(value?: DomainOrNetwork | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfstring(value)) {
        return stringToJSON(value as string);
    }

    return {};
}
