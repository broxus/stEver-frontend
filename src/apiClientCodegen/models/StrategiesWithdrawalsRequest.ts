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
    status?: StrategiesWithdrawalsStatus;
    strategy?: string | null;
}
