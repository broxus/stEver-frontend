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
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Users deposits search
     * Get users deposits data.
     * @param requestBody
     * @returns UsersDepositsResponse OK
     * @throws ApiError
     */
    public static postUsers(
        requestBody: UsersDepositsRequest,
    ): CancelablePromise<UsersDepositsResponse> {
        return __request({
            method: 'POST',
            path: `/users/deposits/search`,
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
    public static postUsers1(
        requestBody: UsersWithdrawalsRequest,
    ): CancelablePromise<UsersWithdrawalsResponse> {
        return __request({
            method: 'POST',
            path: `/users/withdrawals/search`,
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
    public static postUsers2(
        requestBody: TvlRequest,
    ): CancelablePromise<TvlResponse> {
        return __request({
            method: 'POST',
            path: `/users/tvl`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}