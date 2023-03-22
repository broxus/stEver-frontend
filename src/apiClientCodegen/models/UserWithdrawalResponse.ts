/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersWithdrawalsStatus } from './UsersWithdrawalsStatus';

/**
 * User withdrawals response
 */
export type UserWithdrawalResponse = {
    /**
     * amount
     */
    amount?: string;
    nonce: number;
    /**
     * stAmount
     */
    stAmount: string;
    status: UsersWithdrawalsStatus;
    transactionHash: string;
    transactionTime: number;
    userAddress: string;
}
