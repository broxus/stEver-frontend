import { TvmContractWrapper } from '@broxus/js-core'
import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'
import { makeObservable } from 'mobx'

import { DashboardUtils } from './utils'

type DashboardType = {
}

export class Dashboard extends TvmContractWrapper<
    DashboardType
> {

    public static Utils = DashboardUtils

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

    public async getAccountAddress(owner: Address) {
        return Dashboard.Utils._getAccountAddress(this.address, owner)
    }

    public async withdrawRequests(accountAddress: Address) {
        return Dashboard.Utils._withdrawRequests(accountAddress)
    }

}
