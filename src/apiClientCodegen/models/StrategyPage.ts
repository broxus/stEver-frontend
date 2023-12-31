/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategyPriority } from './StrategyPriority';

/**
 * Strategy Page Info
 */
export type StrategyPage = {
    deleting: boolean;
    owner: string;
    priority: StrategyPriority;
    /**
     * tvl
     */
    tvl: string;
    /**
     * tvlDelta
     */
    tvlDelta: string;
    /**
     * tvlDeltaNextRound
     */
    tvlDeltaNextRound?: string;
};

