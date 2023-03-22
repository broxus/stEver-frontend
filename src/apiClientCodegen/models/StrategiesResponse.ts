/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyInfo } from './StrategyInfo';

/**
 * Strategies table response
 */
export type StrategiesResponse = {
    strategies: Array<StrategyInfo>;
    totalCount: number;
}
