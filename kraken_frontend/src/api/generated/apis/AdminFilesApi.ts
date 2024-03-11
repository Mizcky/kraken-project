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
  FullFilesPage,
} from '../models';
import {
    ApiErrorResponseFromJSON,
    ApiErrorResponseToJSON,
    FullFilesPageFromJSON,
    FullFilesPageToJSON,
} from '../models';

export interface DeleteFileAdminRequest {
    uuid: string;
}

export interface DownloadFileAdminRequest {
    uuid: string;
}

export interface GetAllFilesAdminRequest {
    limit: number;
    offset: number;
    workspace?: string | null;
    user?: string | null;
}

/**
 * 
 */
export class AdminFilesApi extends runtime.BaseAPI {

    /**
     * Deletes a file
     * Deletes a file
     */
    async deleteFileAdminRaw(requestParameters: DeleteFileAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling deleteFileAdmin.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/admin/files/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a file
     * Deletes a file
     */
    async deleteFileAdmin(requestParameters: DeleteFileAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteFileAdminRaw(requestParameters, initOverrides);
    }

    /**
     * Downloads a file
     * Downloads a file
     */
    async downloadFileAdminRaw(requestParameters: DownloadFileAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling downloadFileAdmin.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/admin/files/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Downloads a file
     * Downloads a file
     */
    async downloadFileAdmin(requestParameters: DownloadFileAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Blob> {
        const response = await this.downloadFileAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all files
     * Retrieve all files
     */
    async getAllFilesAdminRaw(requestParameters: GetAllFilesAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FullFilesPage>> {
        if (requestParameters.limit === null || requestParameters.limit === undefined) {
            throw new runtime.RequiredError('limit','Required parameter requestParameters.limit was null or undefined when calling getAllFilesAdmin.');
        }

        if (requestParameters.offset === null || requestParameters.offset === undefined) {
            throw new runtime.RequiredError('offset','Required parameter requestParameters.offset was null or undefined when calling getAllFilesAdmin.');
        }

        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.workspace !== undefined) {
            queryParameters['workspace'] = requestParameters.workspace;
        }

        if (requestParameters.user !== undefined) {
            queryParameters['user'] = requestParameters.user;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/admin/files`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FullFilesPageFromJSON(jsonValue));
    }

    /**
     * Retrieve all files
     * Retrieve all files
     */
    async getAllFilesAdmin(requestParameters: GetAllFilesAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FullFilesPage> {
        const response = await this.getAllFilesAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
