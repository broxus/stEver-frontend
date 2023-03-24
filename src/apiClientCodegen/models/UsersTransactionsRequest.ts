/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserTransactionsKind } from './UserTransactionsKind';
import type { UserTransactionsOrdering } from './UserTransactionsOrdering';

/**
 * Users transactions request
 */
export type UsersTransactionsRequest = {
    /**
     * from
     */
    from?: number | null;
    kind?: UserTransactionsKind;
    limit: number;
    offset: number;
    ordering?: UserTransactionsOrdering;
    /**
     * to
     */
    to?: number | null;
    userAddress?: string | null;
};

