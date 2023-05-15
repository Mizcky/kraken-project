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
 * 
 * @export
 * @interface PageParams
 */
export interface PageParams {
    /**
     * Number of items to retrieve
     * @type {number}
     * @memberof PageParams
     */
    limit: number;
    /**
     * Position in the whole list to start retrieving from
     * @type {number}
     * @memberof PageParams
     */
    offset: number;
}

/**
 * Check if a given object implements the PageParams interface.
 */
export function instanceOfPageParams(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "limit" in value;
    isInstance = isInstance && "offset" in value;

    return isInstance;
}

export function PageParamsFromJSON(json: any): PageParams {
    return PageParamsFromJSONTyped(json, false);
}

export function PageParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limit': json['limit'],
        'offset': json['offset'],
    };
}

export function PageParamsToJSON(value?: PageParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'limit': value.limit,
        'offset': value.offset,
    };
}

