/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersWithdrawalsStatus } from './UsersWithdrawalsStatus';

/**
 * Users withdrawals sum request
 */
export type UsersWithdrawalsSumRequest = {
    /**
     * statuses
     */
    statuses?: Array<UsersWithdrawalsStatus> | null;
    userAddress?: string;
};

