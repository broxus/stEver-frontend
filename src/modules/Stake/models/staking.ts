import { ProviderContractWrapper } from '@broxus/js-core'
import { Address, Transaction } from 'everscale-inpage-provider'
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
        address: Address | string,
    ) {
        super(address)
        makeObservable(this)
    }

    public static async create(
        address: Address | string,
    ): Promise<Staking> {
        const staking = new Staking(address)
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

    public async deposit(amount: string): Promise<Transaction> {
        return Staking.Utils._deposit(this.address, amount)
    }

    public async encodeDepositPayload(): Promise<string> {
        return Staking.Utils._encodeDepositPayload(this.address)
    }

    public async transfer(params: {
        amount: string | number;
        recipient: Address;
        deployWalletValue: string | number;
        remainingGasTo: Address;
        notify: boolean;
        payload: string;
    }): Promise<Transaction> {
        return Staking.Utils._transfer(this._data.details?.stEverWallet!, params)
    }


    @computed
    public get details(): StakingType['details'] {
        return this._data.details
    }

}
