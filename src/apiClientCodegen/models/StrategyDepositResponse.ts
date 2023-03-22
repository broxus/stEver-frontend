/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Strategy deposits response
 */
export type StrategyDepositResponse = {
    /**
     * amount
     */
    amount: string;
    errcode: number | null;
    isError: boolean;
    round: number;
    strategy: string;
    transactionHash: string;
    transactionTime: number;
}
