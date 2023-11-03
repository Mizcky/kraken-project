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
import type { SimpleWorkspace } from './SimpleWorkspace';
import {
    SimpleWorkspaceFromJSON,
    SimpleWorkspaceFromJSONTyped,
    SimpleWorkspaceToJSON,
} from './SimpleWorkspace';

/**
 * A user's remembered oauth decision
 * @export
 * @interface FullDecision
 */
export interface FullDecision {
    /**
     * The primary key
     * @type {string}
     * @memberof FullDecision
     */
    uuid: string;
    /**
     * The application the decision was made for
     * @type {string}
     * @memberof FullDecision
     */
    app: string;
    /**
     * 
     * @type {SimpleWorkspace}
     * @memberof FullDecision
     */
    workspace: SimpleWorkspace;
    /**
     * Action what to do with new oauth requests
     * @type {string}
     * @memberof FullDecision
     */
    action: FullDecisionActionEnum;
}


/**
 * @export
 */
export const FullDecisionActionEnum = {
    Accept: 'Accept',
    Deny: 'Deny'
} as const;
export type FullDecisionActionEnum = typeof FullDecisionActionEnum[keyof typeof FullDecisionActionEnum];


/**
 * Check if a given object implements the FullDecision interface.
 */
export function instanceOfFullDecision(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uuid" in value;
    isInstance = isInstance && "app" in value;
    isInstance = isInstance && "workspace" in value;
    isInstance = isInstance && "action" in value;

    return isInstance;
}

export function FullDecisionFromJSON(json: any): FullDecision {
    return FullDecisionFromJSONTyped(json, false);
}

export function FullDecisionFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullDecision {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuid': json['uuid'],
        'app': json['app'],
        'workspace': SimpleWorkspaceFromJSON(json['workspace']),
        'action': json['action'],
    };
}

export function FullDecisionToJSON(value?: FullDecision | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuid': value.uuid,
        'app': value.app,
        'workspace': SimpleWorkspaceToJSON(value.workspace),
        'action': value.action,
    };
}

