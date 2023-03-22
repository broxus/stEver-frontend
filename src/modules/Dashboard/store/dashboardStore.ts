import { AbstractStore } from '@broxus/js-core'
import { makeObservable } from 'mobx'

import {
    StrategiesRequest, StrategiesResponse, StrategiesService, StrategiesWithdrawalsRequest, StrategiesWithdrawalsResponse, SystemsTransactionsRequest, SystemsTransactionsResponse, TvlRequest, TvlResponse, UsersService, UsersTransactionsRequest, UsersTransactionsResponse, UsersWithdrawalsRequest, UsersWithdrawalsResponse,
} from '@/apiClientCodegen'

type StakingStoreData = {
    tvlCharts: TvlResponse
    depoolsStrategies: StrategiesResponse
    strategiesTransactions: SystemsTransactionsResponse
    usersTransactions: UsersTransactionsResponse
    strategiesWithdrawals: StrategiesWithdrawalsResponse
    usersWithdrawals: UsersWithdrawalsResponse
}

type StakingStoreState = {
}


export class DashboardStore extends AbstractStore<
    StakingStoreData,
    StakingStoreState
> {

    constructor() {
        super()
        makeObservable(this)
    }

    public async getUsersTvlCharts(params: TvlRequest): Promise<void> {
        this.setData('tvlCharts', await UsersService.postUsers2(params))
    }

    public async getDepoolsStrategies(params: StrategiesRequest): Promise<void> {
        this.setData('depoolsStrategies', await StrategiesService.postStrategies(params))
    }

    public async getStrategiesTransactions(params: SystemsTransactionsRequest): Promise<void> {
        this.setData('strategiesTransactions', await StrategiesService.postStrategies3(params))
    }

    public async getUsersTransactions(params: UsersTransactionsRequest): Promise<void> {
        this.setData('usersTransactions', await StrategiesService.postStrategies5(params))
    }

    public async getStrategiesWithdrawals(params: StrategiesWithdrawalsRequest): Promise<void> {
        this.setData('strategiesWithdrawals', await StrategiesService.postStrategies2(params))
    }

    public async getUsersWithdrawals(params: UsersWithdrawalsRequest): Promise<void> {
        this.setData('usersWithdrawals', await UsersService.postUsers1(params))
    }

}
