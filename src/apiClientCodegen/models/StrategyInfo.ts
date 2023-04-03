/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyPriority } from './StrategyPriority';

/**
 * Strategy Info
 */
export type StrategyInfo = {
    depool: string;
    owner: string;
    priority: StrategyPriority;
    strategy: string;
    /**
     * tvl
     */
    tvl: string;
    /**
     * tvlDeltaNextRound
     */
    tvlDeltaNextRound?: string;
    validatorFee: number;
};

