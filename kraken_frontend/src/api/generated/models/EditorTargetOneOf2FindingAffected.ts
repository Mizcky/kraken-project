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
 * The editor for the `user_details` in [FindingAffected]
 * @export
 * @interface EditorTargetOneOf2FindingAffected
 */
export interface EditorTargetOneOf2FindingAffected {
    /**
     * Uuid of the [Finding]
     * @type {string}
     * @memberof EditorTargetOneOf2FindingAffected
     */
    finding: string;
    /**
     * Uuid of the [FindingAffected]
     * @type {string}
     * @memberof EditorTargetOneOf2FindingAffected
     */
    affected: string;
}

/**
 * Check if a given object implements the EditorTargetOneOf2FindingAffected interface.
 */
export function instanceOfEditorTargetOneOf2FindingAffected(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "finding" in value;
    isInstance = isInstance && "affected" in value;

    return isInstance;
}

export function EditorTargetOneOf2FindingAffectedFromJSON(json: any): EditorTargetOneOf2FindingAffected {
    return EditorTargetOneOf2FindingAffectedFromJSONTyped(json, false);
}

export function EditorTargetOneOf2FindingAffectedFromJSONTyped(json: any, ignoreDiscriminator: boolean): EditorTargetOneOf2FindingAffected {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'finding': json['finding'],
        'affected': json['affected'],
    };
}

export function EditorTargetOneOf2FindingAffectedToJSON(value?: EditorTargetOneOf2FindingAffected | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'finding': value.finding,
        'affected': value.affected,
    };
}
