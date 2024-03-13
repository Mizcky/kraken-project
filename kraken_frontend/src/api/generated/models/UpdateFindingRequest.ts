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
import type { FindingSeverity } from './FindingSeverity';
import {
    FindingSeverityFromJSON,
    FindingSeverityFromJSONTyped,
    FindingSeverityToJSON,
} from './FindingSeverity';

/**
 * The request to update an existing finding
 * @export
 * @interface UpdateFindingRequest
 */
export interface UpdateFindingRequest {
    /**
     * Name of the new finding definition
     * 
     * This must be unique
     * @type {string}
     * @memberof UpdateFindingRequest
     */
    definition?: string | null;
    /**
     * 
     * @type {FindingSeverity}
     * @memberof UpdateFindingRequest
     */
    severity?: FindingSeverity | null;
    /**
     * Notes about the finding provided by the user
     * 
     * May be used for documenting command invocation or other information
     * that are provided by the user
     * @type {string}
     * @memberof UpdateFindingRequest
     */
    details?: string | null;
    /**
     * A screenshot
     * 
     * The file must have been uploaded through the image upload.
     * @type {string}
     * @memberof UpdateFindingRequest
     */
    screenshot?: string | null;
    /**
     * A log file
     * @type {string}
     * @memberof UpdateFindingRequest
     */
    logFile?: string | null;
}

/**
 * Check if a given object implements the UpdateFindingRequest interface.
 */
export function instanceOfUpdateFindingRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateFindingRequestFromJSON(json: any): UpdateFindingRequest {
    return UpdateFindingRequestFromJSONTyped(json, false);
}

export function UpdateFindingRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateFindingRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'definition': !exists(json, 'definition') ? undefined : json['definition'],
        'severity': !exists(json, 'severity') ? undefined : FindingSeverityFromJSON(json['severity']),
        'details': !exists(json, 'details') ? undefined : json['details'],
        'screenshot': !exists(json, 'screenshot') ? undefined : json['screenshot'],
        'logFile': !exists(json, 'log_file') ? undefined : json['log_file'],
    };
}

export function UpdateFindingRequestToJSON(value?: UpdateFindingRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'definition': value.definition,
        'severity': FindingSeverityToJSON(value.severity),
        'details': value.details,
        'screenshot': value.screenshot,
        'log_file': value.logFile,
    };
}

