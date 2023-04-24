import { AbstractStore } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'

import {
    Direction, StrategiesService, UserTransactionColumn, type UserTransactionResponse, type UserTransactionsKind, type UserTransactionsOrdering, type UsersTransactionsRequest,
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
    filter: UserTransactionsKind[]
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
            isFetching: true,
            filter: [],
        }))

        reaction(
            () => { },
            async () => {
                this.getTransactions({
                    from: null,
                    kind: this._state.filter.length === 2 ? undefined : this._state.filter[0],
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
        this.setState('isFetching', true)
        const response = await StrategiesService.postUsersTransactionsSearch(params)
        this.setData('transactions', response.transactions)
        this.setState('isFetching', false)
        if (response.totalCount !== this._state.pagination.totalCount) {
            this.setState('pagination', {
                currentPage: this.pagination.currentPage,
                limit: this.pagination.limit,
                totalCount: response.totalCount,
                totalPages: Math.ceil(response.totalCount / this.pagination.limit),
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

    @computed
    public get filter() {
        return this._state.filter
    }

}
