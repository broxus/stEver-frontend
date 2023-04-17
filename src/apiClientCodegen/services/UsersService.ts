/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApyResponse } from '../models/ApyResponse';
import type { HoldersResponse } from '../models/HoldersResponse';
import type { PriceResponse } from '../models/PriceResponse';
import type { TvlRequest } from '../models/TvlRequest';
import type { TvlResponse } from '../models/TvlResponse';
import type { UsersDepositsRequest } from '../models/UsersDepositsRequest';
import type { UsersDepositsResponse } from '../models/UsersDepositsResponse';
import type { UsersWithdrawalsRequest } from '../models/UsersWithdrawalsRequest';
import type { UsersWithdrawalsResponse } from '../models/UsersWithdrawalsResponse';
import type { UsersWithdrawalsSumRequest } from '../models/UsersWithdrawalsSumRequest';
import type { UsersWithdrawalsSumResponse } from '../models/UsersWithdrawalsSumResponse';

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
     * Users withdrawals sum
     * Get Users withdrawals sum.
     * @param requestBody
     * @returns UsersWithdrawalsSumResponse OK
     * @throws ApiError
     */
    public static postUsersWithdrawalsSum(
        requestBody: UsersWithdrawalsSumRequest,
    ): CancelablePromise<UsersWithdrawalsSumResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/withdrawals/sum',
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

    /**
     * Users price search
     * Get users price data.
     * @param requestBody
     * @returns PriceResponse OK
     * @throws ApiError
     */
    public static postUsersPrice(
        requestBody: TvlRequest,
    ): CancelablePromise<Array<PriceResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/price',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Vault available assets search
     * Get Vault available assets data.
     * @param requestBody
     * @returns PriceResponse OK
     * @throws ApiError
     */
    public static postUsersAvailableAssets(
        requestBody: TvlRequest,
    ): CancelablePromise<Array<PriceResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/available_assets',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Users apy search
     * Get users apy data.
     * @param requestBody
     * @returns ApyResponse OK
     * @throws ApiError
     */
    public static postUsersApy(
        requestBody: TvlRequest,
    ): CancelablePromise<Array<ApyResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/apy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Users holders search
     * Get st ever holders data.
     * @param requestBody
     * @returns HoldersResponse OK
     * @throws ApiError
     */
    public static postUsersHolders(
        requestBody: TvlRequest,
    ): CancelablePromise<Array<HoldersResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/holders',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
