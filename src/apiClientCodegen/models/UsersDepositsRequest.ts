/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDepositsOrdering } from './UserDepositsOrdering';

/**
 * Users deposits request
 */
export type UsersDepositsRequest = {
    /**
     * amountGe
     */
    amountGe?: string;
    /**
     * amountLe
     */
    amountLe?: string;
    limit: number;
    offset: number;
    ordering?: UserDepositsOrdering;
    userAddress?: string | null;
}
