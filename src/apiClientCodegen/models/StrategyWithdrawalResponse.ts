/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategiesWithdrawalsStatus } from './StrategiesWithdrawalsStatus';

/**
 * Strategy withdrawals response
 */
export type StrategyWithdrawalResponse = {
    /**
     * amount
     */
    amount: string;
    round: number;
    status: StrategiesWithdrawalsStatus;
    strategy: string;
    transactionHash: string;
    transactionTime: number;
};

