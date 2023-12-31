/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StrategiesOrdering } from './StrategiesOrdering';

/**
 * Strategies request
 */
export type StrategiesRequest = {
    depool?: string | null;
    limit: number;
    offset: number;
    ordering?: StrategiesOrdering;
    strategies?: Array<string> | null;
    validatorFeeGe?: number | null;
    validatorFeeLe?: number | null;
};

