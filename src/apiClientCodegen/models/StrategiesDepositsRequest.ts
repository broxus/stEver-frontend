/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyDepositsOrdering } from './StrategyDepositsOrdering';

/**
 * Strategies deposits request
 */
export type StrategiesDepositsRequest = {
    isError?: boolean | null;
    limit: number;
    offset: number;
    ordering?: StrategyDepositsOrdering;
    strategy?: string | null;
}
