/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { SystemTransactionColumn } from './SystemTransactionColumn';

/**
 * System Transactions ordering
 */
export type SystemTransactionsOrdering = {
    column: SystemTransactionColumn;
    direction: Direction;
};

