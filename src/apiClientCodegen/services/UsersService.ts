/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TvlRequest } from '../models/TvlRequest';
import type { TvlResponse } from '../models/TvlResponse';
import type { UsersDepositsRequest } from '../models/UsersDepositsRequest';
import type { UsersDepositsResponse } from '../models/UsersDepositsResponse';
import type { UsersWithdrawalsRequest } from '../models/UsersWithdrawalsRequest';
import type { UsersWithdrawalsResponse } from '../models/UsersWithdrawalsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Users deposits search
     * Get users deposits data.
     * @param requestBody
     * @returns UsersDepositsResponse OK
     * @throws ApiError
     */
    public static postUsersDepositsSearch(
        requestBody: UsersDepositsRequest,
    ): CancelablePromise<UsersDepositsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/deposits/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Users withdrawals search
     * Get Users withdrawals data.
     * @param requestBody
     * @returns UsersWithdrawalsResponse OK
     * @throws ApiError
     */
    public static postUsersWithdrawalsSearch(
        requestBody: UsersWithdrawalsRequest,
    ): CancelablePromise<UsersWithdrawalsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/withdrawals/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Users tvl search
     * Get users tvl data.
     * @param requestBody
     * @returns TvlResponse OK
     * @throws ApiError
     */
    public static postUsersTvl(
        requestBody: TvlRequest,
    ): CancelablePromise<Array<TvlResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/tvl',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
