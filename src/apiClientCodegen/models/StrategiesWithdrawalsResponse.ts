/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyWithdrawalResponse } from './StrategyWithdrawalResponse';

/**
 * Strategy withdrawals table response
 */
export type StrategiesWithdrawalsResponse = {
    totalCount: number;
    withdrawals: Array<StrategyWithdrawalResponse>;
}
