/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { StrategyDepositColumn } from './StrategyDepositColumn';

/**
 * StrategyDeposits ordering
 */
export type StrategyDepositsOrdering = {
    column: StrategyDepositColumn;
    direction: Direction;
};

