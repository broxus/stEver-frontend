/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserWithdrawalResponse } from './UserWithdrawalResponse';

/**
 * User withdrawals table response
 */
export type UsersWithdrawalsResponse = {
    totalCount: number;
    userSum?: string;
    withdrawals: Array<UserWithdrawalResponse>;
};

