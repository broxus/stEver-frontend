import { AbstractStore } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'
import { useParams } from 'react-router-dom'

import {
    Direction, StrategiesService, StrategiesWithdrawalsRequest, StrategiesWithdrawalsStatus, StrategyWithdrawalColumn, StrategyWithdrawalResponse, StrategyWithdrawalsOrdering,
} from '@/apiClientCodegen'
import { Params } from '@/routes'

type StrategiesTransactionsStoreData = {
    transactions: Array<StrategyWithdrawalResponse>;
}

type StrategiesTransactionsDashboardPagination = {
    currentPage: number;
    limit: number;
    totalCount?: number;
    totalPages: number;
}

type StrategiesTransactionsStoreState = {
    isFetching?: boolean;
    ordering: StrategyWithdrawalsOrdering
    pagination: StrategiesTransactionsDashboardPagination;
}

export class StrategyWithdrawStore extends AbstractStore<
    StrategiesTransactionsStoreData,
    StrategiesTransactionsStoreState
> {

    protected params = useParams<Params>()

    constructor() {
        super()
        makeObservable(this)

        this.setState(() => ({
            ordering: {
                column: StrategyWithdrawalColumn.CREATED_AT,
                direction: Direction.DESC,
            },
            pagination: {
                currentPage: 0,
                limit: 10,
                totalCount: 0,
                totalPages: 0,
            },
        }))

        reaction(
            () => [
                this._state.ordering,
                this._state.pagination,
            ],
            async () => {
                this.getTransactions({
                    limit: this._state.pagination.limit,
                    offset: this._state.pagination.currentPage * this._state.pagination.limit,
                    ordering: this._state.ordering,
                    status: StrategiesWithdrawalsStatus.PENDING,
                    strategy: this.params.id,
                })
            },
            { fireImmediately: true },
        )
    }

    public async getTransactions(params: StrategiesWithdrawalsRequest): Promise<void> {
        const response = await StrategiesService.postStrategiesWithdrawalsSearch(params)
        this.setData('transactions', response.withdrawals)
        if (response.totalCount !== this._state.pagination.totalCount) {
            this.setState('pagination', {
                currentPage: this.pagination.currentPage,
                limit: this.pagination.limit,
                totalCount: response.totalCount,
                totalPages: response.totalCount / this.pagination.limit,
            })
        }
    }

    @computed
    public get transactions() {
        return this._data.transactions
    }

    @computed
    public get ordering() {
        return this._state.ordering
    }

    @computed
    public get pagination() {
        return this._state.pagination
    }

    @computed
    public get isFetching() {
        return this._state.isFetching
    }

}
