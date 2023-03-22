/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { StrategyWithdrawalColumn } from './StrategyWithdrawalColumn';

/**
 * StrategyWithdrawals ordering
 */
export type StrategyWithdrawalsOrdering = {
    column: StrategyWithdrawalColumn;
    direction: Direction;
}
