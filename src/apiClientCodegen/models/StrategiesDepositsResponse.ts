/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyDepositResponse } from './StrategyDepositResponse';

/**
 * Strategy Deposits table response
 */
export type StrategiesDepositsResponse = {
    deposits: Array<StrategyDepositResponse>;
    totalCount: number;
};

