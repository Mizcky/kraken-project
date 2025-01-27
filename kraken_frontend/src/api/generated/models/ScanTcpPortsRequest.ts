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
import type { PortOrRange } from './PortOrRange';
import {
    PortOrRangeFromJSON,
    PortOrRangeFromJSONTyped,
    PortOrRangeToJSON,
} from './PortOrRange';

/**
 * The settings to configure a tcp port scan
 * @export
 * @interface ScanTcpPortsRequest
 */
export interface ScanTcpPortsRequest {
    /**
     * 
     * @type {string}
     * @memberof ScanTcpPortsRequest
     */
    leechUuid: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ScanTcpPortsRequest
     */
    targets: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ScanTcpPortsRequest
     */
    exclude: Array<string>;
    /**
     * 
     * @type {Array<PortOrRange>}
     * @memberof ScanTcpPortsRequest
     */
    ports: Array<PortOrRange>;
    /**
     * 
     * @type {number}
     * @memberof ScanTcpPortsRequest
     */
    retryInterval: number;
    /**
     * 
     * @type {number}
     * @memberof ScanTcpPortsRequest
     */
    maxRetries: number;
    /**
     * 
     * @type {number}
     * @memberof ScanTcpPortsRequest
     */
    timeout: number;
    /**
     * 
     * @type {number}
     * @memberof ScanTcpPortsRequest
     */
    concurrentLimit: number;
    /**
     * 
     * @type {boolean}
     * @memberof ScanTcpPortsRequest
     */
    skipIcmpCheck: boolean;
    /**
     * 
     * @type {string}
     * @memberof ScanTcpPortsRequest
     */
    workspaceUuid: string;
}

/**
 * Check if a given object implements the ScanTcpPortsRequest interface.
 */
export function instanceOfScanTcpPortsRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "leechUuid" in value;
    isInstance = isInstance && "targets" in value;
    isInstance = isInstance && "exclude" in value;
    isInstance = isInstance && "ports" in value;
    isInstance = isInstance && "retryInterval" in value;
    isInstance = isInstance && "maxRetries" in value;
    isInstance = isInstance && "timeout" in value;
    isInstance = isInstance && "concurrentLimit" in value;
    isInstance = isInstance && "skipIcmpCheck" in value;
    isInstance = isInstance && "workspaceUuid" in value;

    return isInstance;
}

export function ScanTcpPortsRequestFromJSON(json: any): ScanTcpPortsRequest {
    return ScanTcpPortsRequestFromJSONTyped(json, false);
}

export function ScanTcpPortsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanTcpPortsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'leechUuid': json['leech_uuid'],
        'targets': json['targets'],
        'exclude': json['exclude'],
        'ports': ((json['ports'] as Array<any>).map(PortOrRangeFromJSON)),
        'retryInterval': json['retry_interval'],
        'maxRetries': json['max_retries'],
        'timeout': json['timeout'],
        'concurrentLimit': json['concurrent_limit'],
        'skipIcmpCheck': json['skip_icmp_check'],
        'workspaceUuid': json['workspace_uuid'],
    };
}

export function ScanTcpPortsRequestToJSON(value?: ScanTcpPortsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'leech_uuid': value.leechUuid,
        'targets': value.targets,
        'exclude': value.exclude,
        'ports': ((value.ports as Array<any>).map(PortOrRangeToJSON)),
        'retry_interval': value.retryInterval,
        'max_retries': value.maxRetries,
        'timeout': value.timeout,
        'concurrent_limit': value.concurrentLimit,
        'skip_icmp_check': value.skipIcmpCheck,
        'workspace_uuid': value.workspaceUuid,
    };
}

