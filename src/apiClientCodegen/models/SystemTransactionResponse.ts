/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SystemTransactionsKind } from './SystemTransactionsKind';

/**
 * System transactions response
 */
export type SystemTransactionResponse = {
    /**
     * amount
     */
    amount: string;
    kind: SystemTransactionsKind;
    strategy: string;
    transactionHash: string;
    transactionTime: number;
}
