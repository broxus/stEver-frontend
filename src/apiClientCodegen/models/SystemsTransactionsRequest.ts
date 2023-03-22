/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SystemTransactionsKind } from './SystemTransactionsKind';
import type { SystemTransactionsOrdering } from './SystemTransactionsOrdering';

/**
 * Systems transactions request
 */
export type SystemsTransactionsRequest = {
    kind?: SystemTransactionsKind;
    limit: number;
    offset: number;
    ordering?: SystemTransactionsOrdering;
    strategy?: string | null;
}
