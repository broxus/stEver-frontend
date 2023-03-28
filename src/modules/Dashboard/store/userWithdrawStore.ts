import { AbstractStore } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'

import {
    Direction, UserWithdrawalColumn, UserWithdrawalResponse, UserWithdrawalsOrdering, UsersService, UsersWithdrawalsRequest, UsersWithdrawalsStatus,
} from '@/apiClientCodegen'

type UserTransactionsStoreData = {
    transactions: Array<UserWithdrawalResponse>;
}

type UserTransactionsDashboardPagination = {
    currentPage: number;
    limit: number;
    totalCount?: number;
    totalPages: number;
}

type UserTransactionsStoreState = {
    isFetching?: boolean;
    ordering: UserWithdrawalsOrdering
    pagination: UserTransactionsDashboardPagination;
}

export class UserWithdrawStore extends AbstractStore<
    UserTransactionsStoreData,
    UserTransactionsStoreState
> {

    constructor() {
        super()
        makeObservable(this)

        this.setState(() => ({
            ordering: {
                column: UserWithdrawalColumn.CREATED_AT,
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
                    userAddress: null,
                    // status: UsersWithdrawalsStatus.DONE,
                    amountGe: undefined,
                    amountLe: undefined,
                })
            },
            { fireImmediately: true },
        )
    }

    public async getTransactions(params: UsersWithdrawalsRequest): Promise<void> {
        const response = await UsersService.postUsersWithdrawalsSearch(params)
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
