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
 * A notification about a finished search
 * @export
 * @interface WsMessageOneOf3
 */
export interface WsMessageOneOf3 {
    /**
     * The corresponding id of the search
     * @type {string}
     * @memberof WsMessageOneOf3
     */
    searchUuid: string;
    /**
     * Whether the search was finished successfully
     * @type {boolean}
     * @memberof WsMessageOneOf3
     */
    finishedSuccessful: boolean;
    /**
     * 
     * @type {string}
     * @memberof WsMessageOneOf3
     */
    type: WsMessageOneOf3TypeEnum;
}


/**
 * @export
 */
export const WsMessageOneOf3TypeEnum = {
    SearchFinished: 'SearchFinished'
} as const;
export type WsMessageOneOf3TypeEnum = typeof WsMessageOneOf3TypeEnum[keyof typeof WsMessageOneOf3TypeEnum];


/**
 * Check if a given object implements the WsMessageOneOf3 interface.
 */
export function instanceOfWsMessageOneOf3(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "searchUuid" in value;
    isInstance = isInstance && "finishedSuccessful" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function WsMessageOneOf3FromJSON(json: any): WsMessageOneOf3 {
    return WsMessageOneOf3FromJSONTyped(json, false);
}

export function WsMessageOneOf3FromJSONTyped(json: any, ignoreDiscriminator: boolean): WsMessageOneOf3 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'searchUuid': json['search_uuid'],
        'finishedSuccessful': json['finished_successful'],
        'type': json['type'],
    };
}

export function WsMessageOneOf3ToJSON(value?: WsMessageOneOf3 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'search_uuid': value.searchUuid,
        'finished_successful': value.finishedSuccessful,
        'type': value.type,
    };
}

