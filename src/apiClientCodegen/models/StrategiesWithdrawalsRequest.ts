/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategiesWithdrawalsStatus } from './StrategiesWithdrawalsStatus';
import type { StrategyWithdrawalsOrdering } from './StrategyWithdrawalsOrdering';

/**
 * Strategies withdrawals request
 */
export type StrategiesWithdrawalsRequest = {
    limit: number;
    offset: number;
    ordering?: StrategyWithdrawalsOrdering;
    statuses?: Array<StrategiesWithdrawalsStatus> | null;
    strategy?: string | null;
};

