/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserTransactionsKind } from './UserTransactionsKind';

/**
 * User transactions response
 */
export type UserTransactionResponse = {
    /**
     * amount
     */
    amount: string;
    kind: UserTransactionsKind;
    transactionHash: string;
    transactionTime: number;
    userAddress: string;
}
