/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { UserWithdrawalColumn } from './UserWithdrawalColumn';

/**
 * UserWithdrawals ordering
 */
export type UserWithdrawalsOrdering = {
    column: UserWithdrawalColumn;
    direction: Direction;
};

