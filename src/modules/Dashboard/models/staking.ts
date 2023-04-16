import { ProviderContractWrapper } from '@broxus/js-core'
import { Address, ProviderRpcClient, Transaction } from 'everscale-inpage-provider'
import {
    computed, makeObservable,
} from 'mobx'

import { StEverVaultDetails } from '@/abi/types'

import { StakingUtils } from './utils'

type StakingType = {
    details?: StEverVaultDetails
}

const initState: StakingType = {

}

export class Dashboard extends ProviderContractWrapper<
    StakingType
> {

    public static Utils = StakingUtils

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
    ): Promise<Dashboard> {
        const staking = new Dashboard(connection, address)
        return staking
    }


    public async removePendingWithdraw(nonce: number, owner: Address) {
        return Dashboard.Utils._removePendingWithdraw(this.address, owner, nonce)
    }

    @computed
    public get details(): StakingType['details'] {
        return this._data.details
    }

}
