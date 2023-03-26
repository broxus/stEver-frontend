import { AbstractStore } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'

import {
    Direction, StrategiesService, UserTransactionColumn, UserTransactionResponse, UserTransactionsKind, UserTransactionsOrdering, UsersTransactionsRequest,
} from '@/apiClientCodegen'

type UserTransactionsStoreData = {
    transactions: Array<UserTransactionResponse>;
}

type UserTransactionsDashboardPagination = {
    currentPage: number;
    limit: number;
    totalCount?: number;
    totalPages: number;
}

type UserTransactionsStoreState = {
    isFetching?: boolean;
    ordering: UserTransactionsOrdering
    pagination: UserTransactionsDashboardPagination;
}

export class UserTransactionsStore extends AbstractStore<
    UserTransactionsStoreData,
    UserTransactionsStoreState
> {

    constructor() {
        super()
        makeObservable(this)

        this.setState(() => ({
            ordering: {
                column: UserTransactionColumn.CREATED_AT,
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
                    from: null,
                    kind: UserTransactionsKind.DEPOSIT,
                    limit: this._state.pagination.limit,
                    offset: this._state.pagination.currentPage * this._state.pagination.limit,
                    ordering: this._state.ordering,
                    to: null,
                    userAddress: null,
                })
            },
            { fireImmediately: true },
        )
    }

    public async getTransactions(params: UsersTransactionsRequest): Promise<void> {
        const response = await StrategiesService.postUsersTransactionsSearch(params)
        this.setData('transactions', response.transactions)
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
