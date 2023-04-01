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

export class Staking extends ProviderContractWrapper<
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
    ): Promise<Staking> {
        const staking = new Staking(connection, address)
        const details = await staking.getStakeDetails()
        staking.setData('details', details)
        return staking
    }

    public async getStakeDetails() {
        return await Staking.Utils._getStakeDetails(this.address)
    }

    public async getDepositStEverAmount(amount: string): Promise<string> {
        return Staking.Utils._getDepositStEverAmount(this.address, amount)
    }

    public async getWithdrawEverAmount(amount: string): Promise<string> {
        return Staking.Utils._getWithdrawEverAmount(this.address, amount)
    }

    public async deposit(amount: string, sender: Address): Promise<Transaction> {
        return Staking.Utils._deposit(this.address, sender, amount)
    }

    public async encodeDepositPayload(): Promise<string> {
        return Staking.Utils._encodeDepositPayload(this.address)
    }

    public async getTokenWallet(address: Address, owner: Address): Promise<Address> {
        return Staking.Utils._getTokenWallet(address, owner)
    }

    public async transfer(address: Address, sender: Address, params: {
        amount: string | number;
        recipient: Address;
        deployWalletValue: string | number;
        remainingGasTo: Address;
        notify: boolean;
        payload: string;
    }): Promise<Transaction> {
        return Staking.Utils._transfer(address, sender, params)
    }


    @computed
    public get details(): StakingType['details'] {
        return this._data.details
    }

}
