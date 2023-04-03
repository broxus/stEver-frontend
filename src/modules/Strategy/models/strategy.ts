import { ProviderContractWrapper } from '@broxus/js-core'
import { Address, ProviderRpcClient, Transaction } from 'everscale-inpage-provider'
import {
    computed, makeObservable,
} from 'mobx'

import { GetDePoolInfo, GetRounds, StrategyDePool } from '@/abi/types'

import { StrategyUtils } from './utils'

type StrategyType = {
    details?: GetDePoolInfo
    rounds?: GetRounds
}

const initState: StrategyType = {

}

export class Strategy extends ProviderContractWrapper<
    StrategyType
> {

    public static Utils  = StrategyUtils

    constructor(
        protected readonly connection: ProviderRpcClient,
        address: Address | string,
    ) {
        super(connection, address)
        makeObservable(this)
    }

    public static async create(
        address: Address | string,
        connection: ProviderRpcClient,
    ): Promise<Strategy> {
        const staking = new Strategy(connection, address)
        const details = await staking.getStrategyDetails()
        const dePoolDetails = await staking.getDePoolDetails(details.dePool)
        const rounds = await staking.getRounds(details.dePool)
        staking.setData('details', dePoolDetails)
        staking.setData("rounds", rounds)
        return staking
    }

    public async getStrategyDetails() {
        return await Strategy.Utils._getStrategyDetails(this.address)
    }

    public async getDePoolDetails(address: Address) {
        return await Strategy.Utils._getDePoolDetails(address)
    }

    public async getRounds(address: Address) {
        return await Strategy.Utils._getRounds(address)
    } 
    @computed
    public get details(): StrategyType['details'] {
        return this._data.details
    }

    @computed
    public get rounds(): StrategyType['rounds'] {
        return this._data.rounds
    }


}
