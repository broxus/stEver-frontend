import { ProviderContractWrapper } from '@broxus/js-core'
import { Address, Transaction } from 'everscale-inpage-provider'
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

    public static Utils = StrategyUtils

    constructor(
        address: Address | string,
    ) {
        super(address)
        makeObservable(this)
    }

    public static async create(
        address: Address | string,
    ): Promise<Strategy> {
        const staking = new Strategy(address)
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
