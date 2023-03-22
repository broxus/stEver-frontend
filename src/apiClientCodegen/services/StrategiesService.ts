/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainPageResponse } from '../models/MainPageResponse';
import type { StrategiesDepositsRequest } from '../models/StrategiesDepositsRequest';
import type { StrategiesDepositsResponse } from '../models/StrategiesDepositsResponse';
import type { StrategiesRequest } from '../models/StrategiesRequest';
import type { StrategiesResponse } from '../models/StrategiesResponse';
import type { StrategiesWithdrawalsRequest } from '../models/StrategiesWithdrawalsRequest';
import type { StrategiesWithdrawalsResponse } from '../models/StrategiesWithdrawalsResponse';
import type { StrategyPageResponse } from '../models/StrategyPageResponse';
import type { SystemsTransactionsRequest } from '../models/SystemsTransactionsRequest';
import type { SystemsTransactionsResponse } from '../models/SystemsTransactionsResponse';
import type { TvlRequest } from '../models/TvlRequest';
import type { TvlResponse } from '../models/TvlResponse';
import type { UsersTransactionsRequest } from '../models/UsersTransactionsRequest';
import type { UsersTransactionsResponse } from '../models/UsersTransactionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class StrategiesService {

    /**
     * Strategies search
     * Get strategies data.
     * @param requestBody
     * @returns StrategiesResponse OK
     * @throws ApiError
     */
    public static postStrategies(
        requestBody: StrategiesRequest,
    ): CancelablePromise<StrategiesResponse> {
        return __request({
            method: 'POST',
            path: `/strategies/search`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Strategies deposits search
     * Get strategies deposits data.
     * @param requestBody
     * @returns StrategiesDepositsResponse OK
     * @throws ApiError
     */
    public static postStrategies1(
        requestBody: StrategiesDepositsRequest,
    ): CancelablePromise<StrategiesDepositsResponse> {
        return __request({
            method: 'POST',
            path: `/strategies/deposits/search`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Strategies withdrawals search
     * Get strategies withdrawals data.
     * @param requestBody
     * @returns StrategiesWithdrawalsResponse OK
     * @throws ApiError
     */
    public static postStrategies2(
        requestBody: StrategiesWithdrawalsRequest,
    ): CancelablePromise<StrategiesWithdrawalsResponse> {
        return __request({
            method: 'POST',
            path: `/strategies/withdrawals/search`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Strategies transactions search
     * Get strategies transactions data.
     * @param requestBody
     * @returns SystemsTransactionsResponse OK
     * @throws ApiError
     */
    public static postStrategies3(
        requestBody: SystemsTransactionsRequest,
    ): CancelablePromise<SystemsTransactionsResponse> {
        return __request({
            method: 'POST',
            path: `/strategies/transactions/search`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Strategies main page data
     * Get strategies main page data.
     * @returns MainPageResponse OK
     * @throws ApiError
     */
    public static getStrategies(): CancelablePromise<MainPageResponse> {
        return __request({
            method: 'GET',
            path: `/strategies/main`,
        });
    }

    /**
     * Strategy main page data
     * Get strategy main page data.
     * @param string
     * @returns StrategyPageResponse OK
     * @throws ApiError
     */
    public static getStrategies1(
        string: string,
    ): CancelablePromise<StrategyPageResponse> {
        return __request({
            method: 'GET',
            path: `/strategies/${string}/main`,
        });
    }

    /**
     * Strategy tvl search
     * Get Strategy tvl data.
     * @param string
     * @param requestBody
     * @returns TvlResponse OK
     * @throws ApiError
     */
    public static postStrategies4(
        string: string,
        requestBody: TvlRequest,
    ): CancelablePromise<TvlResponse> {
        return __request({
            method: 'POST',
            path: `/strategies/${string}/tvl`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Users transactions search
     * Get users transactions data.
     * @param requestBody
     * @returns UsersTransactionsResponse OK
     * @throws ApiError
     */
    public static postStrategies5(
        requestBody: UsersTransactionsRequest,
    ): CancelablePromise<UsersTransactionsResponse> {
        return __request({
            method: 'POST',
            path: `/users/transactions/search`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}