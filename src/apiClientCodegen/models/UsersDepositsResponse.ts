/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDepositResponse } from './UserDepositResponse';

/**
 * User Deposits table response
 */
export type UsersDepositsResponse = {
    deposits: Array<UserDepositResponse>;
    totalCount: number;
};

