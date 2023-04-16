import { AbstractStore, TvmWalletService, useRpcProvider } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'

import {
    Direction, UserWithdrawalColumn, UserWithdrawalResponse, UserWithdrawalsOrdering, UsersService, UsersWithdrawalsRequest, UsersWithdrawalsStatus,
} from '@/apiClientCodegen'
import { Dashboard } from '../models/staking';
import { ST_EVER_VAULT_ADDRESS_CONFIG } from '@/config';
import { Address } from 'everscale-inpage-provider';

type UserTransactionsStoreData = {
    transactions: Array<UserWithdrawalResponse>;
    modelStaking?: Dashboard;
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

export class MyWithdrawStore extends AbstractStore<
    UserTransactionsStoreData,
    UserTransactionsStoreState
> {
    protected rpc = useRpcProvider()

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
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
            isFetching: true,
        }))

        reaction(
            () => { },
            async () => {
                const contr = await Dashboard.create(ST_EVER_VAULT_ADDRESS_CONFIG, this.rpc)
                this.setData('modelStaking', contr)
            },
            { fireImmediately: true },
        )
    }


    public async removePendingWithdraw(nonce: number): Promise<void> {
        await this._data?.modelStaking?.removePendingWithdraw(nonce, this.wallet.account?.address as Address)
    }

    public async getTransactions(params: UsersWithdrawalsRequest): Promise<void> {
        this.setState('isFetching', true)
        const response = await UsersService.postUsersWithdrawalsSearch(params)
        this.setData('transactions', response.withdrawals)
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

}
