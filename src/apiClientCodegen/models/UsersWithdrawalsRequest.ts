/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersWithdrawalsStatus } from './UsersWithdrawalsStatus';
import type { UserWithdrawalsOrdering } from './UserWithdrawalsOrdering';

/**
 * Users withdrawals request
 */
export type UsersWithdrawalsRequest = {
    /**
     * amountGe
     */
    amountGe?: string;
    /**
     * amountLe
     */
    amountLe?: string;
    limit: number;
    offset: number;
    ordering?: UserWithdrawalsOrdering;
    status?: UsersWithdrawalsStatus;
    userAddress?: string | null;
}
