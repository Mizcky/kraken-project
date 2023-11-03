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

import { exists, mapValues } from '../runtime';
/**
 * A result for a subdomain enumeration using bruteforce DNS requests
 * @export
 * @interface WsMessageOneOf5
 */
export interface WsMessageOneOf5 {
    /**
     * The corresponding id of the attack
     * @type {string}
     * @memberof WsMessageOneOf5
     */
    attackUuid: string;
    /**
     * The source address that was queried
     * @type {string}
     * @memberof WsMessageOneOf5
     */
    source: string;
    /**
     * The destination address that was returned
     * @type {string}
     * @memberof WsMessageOneOf5
     */
    destination: string;
    /**
     * 
     * @type {string}
     * @memberof WsMessageOneOf5
     */
    type: WsMessageOneOf5TypeEnum;
}


/**
 * @export
 */
export const WsMessageOneOf5TypeEnum = {
    BruteforceSubdomainsResult: 'BruteforceSubdomainsResult'
} as const;
export type WsMessageOneOf5TypeEnum = typeof WsMessageOneOf5TypeEnum[keyof typeof WsMessageOneOf5TypeEnum];


/**
 * Check if a given object implements the WsMessageOneOf5 interface.
 */
export function instanceOfWsMessageOneOf5(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "attackUuid" in value;
    isInstance = isInstance && "source" in value;
    isInstance = isInstance && "destination" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function WsMessageOneOf5FromJSON(json: any): WsMessageOneOf5 {
    return WsMessageOneOf5FromJSONTyped(json, false);
}

export function WsMessageOneOf5FromJSONTyped(json: any, ignoreDiscriminator: boolean): WsMessageOneOf5 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'attackUuid': json['attack_uuid'],
        'source': json['source'],
        'destination': json['destination'],
        'type': json['type'],
    };
}

export function WsMessageOneOf5ToJSON(value?: WsMessageOneOf5 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'attack_uuid': value.attackUuid,
        'source': value.source,
        'destination': value.destination,
        'type': value.type,
    };
}

