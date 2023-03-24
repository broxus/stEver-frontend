/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { UserTransactionColumn } from './UserTransactionColumn';

/**
 * User Transactions ordering
 */
export type UserTransactionsOrdering = {
    column: UserTransactionColumn;
    direction: Direction;
};

