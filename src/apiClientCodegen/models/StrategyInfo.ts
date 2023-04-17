/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyPriority } from './StrategyPriority';

/**
 * Strategy Info
 */
export type StrategyInfo = {
    deleting: boolean;
    depool: string;
    owner: string;
    priority: StrategyPriority;
    stakeCurrentRound: string;
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

