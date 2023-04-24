import { AbstractStore, type TvmWalletService, useRpcProvider } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'
import { type Address } from 'everscale-inpage-provider'

import {
    Direction, UserWithdrawalColumn, type UserWithdrawalResponse, type UserWithdrawalsOrdering, UsersService, type UsersWithdrawalsRequest, UsersWithdrawalsStatus,
} from '@/apiClientCodegen'
import { ST_EVER_VAULT_ADDRESS_CONFIG } from '@/config'

import { Dashboard } from '../models/dashboard'

type UserTransactionsStoreData = {
    transactions: Array<UserWithdrawalResponse>;
    modelDashboard: Dashboard;
    userSum?: string;
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
                this.setData('modelDashboard', contr)
            },
            { fireImmediately: true },
        )
    }


    public async removePendingWithdraw(nonce: number, idx: number): Promise<void> {
        const _transactions = this._data.transactions
        try {
            _transactions[idx].status = UsersWithdrawalsStatus.CANCELLED
            this.setData('transactions', _transactions)
            await this._data.modelDashboard.removePendingWithdraw(nonce, this.wallet.account?.address as Address)

            const accountAddress = await this._data.modelDashboard.getAccountAddress(this.wallet.account?.address as Address)
            const details = await this._data.modelDashboard.withdrawRequests(accountAddress)
            const filteredTransactions = _transactions.filter(transaction => details.some(detail => detail[0] === `${transaction.nonce}`))
            this.setData('transactions', filteredTransactions)


        }
        catch {
            _transactions[idx].status = UsersWithdrawalsStatus.PENDING
            this.setData('transactions', _transactions)
        }
    }

    public async getTransactions(params: UsersWithdrawalsRequest): Promise<void> {
        this.setState('isFetching', true)
        const response = await UsersService.postUsersWithdrawalsSearch(params)
        this.setData('transactions', response.withdrawals)
        this.setData('userSum', response.userSum)
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
    public get userSum() {
        return this._data.userSum
    }

}
