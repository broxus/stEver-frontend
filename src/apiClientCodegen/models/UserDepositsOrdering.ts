/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { UserDepositColumn } from './UserDepositColumn';

/**
 * UserDeposits ordering
 */
export type UserDepositsOrdering = {
    column: UserDepositColumn;
    direction: Direction;
};

