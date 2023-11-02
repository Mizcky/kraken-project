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
import type { FullQueryCertificateTransparencyResult } from './FullQueryCertificateTransparencyResult';
import {
    FullQueryCertificateTransparencyResultFromJSON,
    FullQueryCertificateTransparencyResultFromJSONTyped,
    FullQueryCertificateTransparencyResultToJSON,
} from './FullQueryCertificateTransparencyResult';

/**
 * 
 * @export
 * @interface SearchResultEntryOneOf7
 */
export interface SearchResultEntryOneOf7 {
    /**
     * 
     * @type {FullQueryCertificateTransparencyResult}
     * @memberof SearchResultEntryOneOf7
     */
    certificateTransparencyResultEntry: FullQueryCertificateTransparencyResult;
}

/**
 * Check if a given object implements the SearchResultEntryOneOf7 interface.
 */
export function instanceOfSearchResultEntryOneOf7(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "certificateTransparencyResultEntry" in value;

    return isInstance;
}

export function SearchResultEntryOneOf7FromJSON(json: any): SearchResultEntryOneOf7 {
    return SearchResultEntryOneOf7FromJSONTyped(json, false);
}

export function SearchResultEntryOneOf7FromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultEntryOneOf7 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'certificateTransparencyResultEntry': FullQueryCertificateTransparencyResultFromJSON(json['CertificateTransparencyResultEntry']),
    };
}

export function SearchResultEntryOneOf7ToJSON(value?: SearchResultEntryOneOf7 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'CertificateTransparencyResultEntry': FullQueryCertificateTransparencyResultToJSON(value.certificateTransparencyResultEntry),
    };
}
