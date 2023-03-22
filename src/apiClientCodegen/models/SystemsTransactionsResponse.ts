/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SystemTransactionResponse } from './SystemTransactionResponse';

/**
 * System transactions table response
 */
export type SystemsTransactionsResponse = {
    totalCount: number;
    transactions: Array<SystemTransactionResponse>;
}
