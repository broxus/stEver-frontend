/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserTransactionResponse } from './UserTransactionResponse';

/**
 * User transactions table response
 */
export type UsersTransactionsResponse = {
    totalCount: number;
    transactions: Array<UserTransactionResponse>;
};

