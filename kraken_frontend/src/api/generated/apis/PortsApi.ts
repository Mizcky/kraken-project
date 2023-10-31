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


import * as runtime from '../runtime';
import type {
  ApiErrorResponse,
  FullPort,
  PortResultsPage,
  UpdatePortRequest,
} from '../models';
import {
    ApiErrorResponseFromJSON,
    ApiErrorResponseToJSON,
    FullPortFromJSON,
    FullPortToJSON,
    PortResultsPageFromJSON,
    PortResultsPageToJSON,
    UpdatePortRequestFromJSON,
    UpdatePortRequestToJSON,
} from '../models';

export interface GetAllPortsRequest {
    uuid: string;
    limit: number;
    offset: number;
    host?: string | null;
}

export interface GetPortRequest {
    wUuid: string;
    pUuid: string;
}

export interface UpdatePortOperationRequest {
    wUuid: string;
    pUuid: string;
    updatePortRequest: UpdatePortRequest;
}

/**
 * 
 */
export class PortsApi extends runtime.BaseAPI {

    /**
     * List the ports of a workspace
     * List the ports of a workspace
     */
    async getAllPortsRaw(requestParameters: GetAllPortsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PortResultsPage>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling getAllPorts.');
        }

        if (requestParameters.limit === null || requestParameters.limit === undefined) {
            throw new runtime.RequiredError('limit','Required parameter requestParameters.limit was null or undefined when calling getAllPorts.');
        }

        if (requestParameters.offset === null || requestParameters.offset === undefined) {
            throw new runtime.RequiredError('offset','Required parameter requestParameters.offset was null or undefined when calling getAllPorts.');
        }

        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.host !== undefined) {
            queryParameters['host'] = requestParameters.host;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/workspaces/{uuid}/ports`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PortResultsPageFromJSON(jsonValue));
    }

    /**
     * List the ports of a workspace
     * List the ports of a workspace
     */
    async getAllPorts(requestParameters: GetAllPortsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PortResultsPage> {
        const response = await this.getAllPortsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all information about a single port
     * Retrieve all information about a single port
     */
    async getPortRaw(requestParameters: GetPortRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FullPort>> {
        if (requestParameters.wUuid === null || requestParameters.wUuid === undefined) {
            throw new runtime.RequiredError('wUuid','Required parameter requestParameters.wUuid was null or undefined when calling getPort.');
        }

        if (requestParameters.pUuid === null || requestParameters.pUuid === undefined) {
            throw new runtime.RequiredError('pUuid','Required parameter requestParameters.pUuid was null or undefined when calling getPort.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/workspaces/{w_uuid}/ports/{p_uuid}`.replace(`{${"w_uuid"}}`, encodeURIComponent(String(requestParameters.wUuid))).replace(`{${"p_uuid"}}`, encodeURIComponent(String(requestParameters.pUuid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FullPortFromJSON(jsonValue));
    }

    /**
     * Retrieve all information about a single port
     * Retrieve all information about a single port
     */
    async getPort(requestParameters: GetPortRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FullPort> {
        const response = await this.getPortRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a port  You must include at least on parameter
     * Update a port
     */
    async updatePortRaw(requestParameters: UpdatePortOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.wUuid === null || requestParameters.wUuid === undefined) {
            throw new runtime.RequiredError('wUuid','Required parameter requestParameters.wUuid was null or undefined when calling updatePort.');
        }

        if (requestParameters.pUuid === null || requestParameters.pUuid === undefined) {
            throw new runtime.RequiredError('pUuid','Required parameter requestParameters.pUuid was null or undefined when calling updatePort.');
        }

        if (requestParameters.updatePortRequest === null || requestParameters.updatePortRequest === undefined) {
            throw new runtime.RequiredError('updatePortRequest','Required parameter requestParameters.updatePortRequest was null or undefined when calling updatePort.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/workspaces/{w_uuid}/ports/{p_uuid}`.replace(`{${"w_uuid"}}`, encodeURIComponent(String(requestParameters.wUuid))).replace(`{${"p_uuid"}}`, encodeURIComponent(String(requestParameters.pUuid))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePortRequestToJSON(requestParameters.updatePortRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update a port  You must include at least on parameter
     * Update a port
     */
    async updatePort(requestParameters: UpdatePortOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updatePortRaw(requestParameters, initOverrides);
    }

}
