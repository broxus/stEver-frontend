import {
    AbstractStore, TvmWalletService, useRpcClient, useRpcProvider,
} from '@broxus/js-core'
import BigNumber from 'bignumber.js'
import {
    computed, makeObservable, reaction,
} from 'mobx'

import { StEverVaultDetails } from '@/abi/types'
import { ST_EVER_VAULT_ADDRESS_CONFIG } from '@/constants'

import { Staking } from '../models/staking'

export enum StakingType {
    Stake = 'Stake',
    Unstake = 'Unstake',
}

type StakingStoreState = {
    amount?: string;
    type: StakingType;
    depositStEverAmount: string;
}

type StakingStoreData = {
    contr: Staking;
}


export class StakingStore extends AbstractStore<
    StakingStoreData,
    StakingStoreState
> {

    protected rpc = useRpcProvider()

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
        super()
        makeObservable(this)

        this.setState('type', StakingType.Stake);
        this.setState("depositStEverAmount", "0");


        (async () => {
            const contr = await Staking.create(ST_EVER_VAULT_ADDRESS_CONFIG)
            this.setData('contr', contr)
        })()

        reaction(
            () => this._state.amount,
            async amount => {
                if (amount)
                    this.estimateDepositStEverAmount(amount)
            },
            { fireImmediately: true },
        )

        reaction(
            () => this._state.type,
            async () => {
                if (this._state.amount)
                    this.estimateDepositStEverAmount(this._state.amount)
            },
            { fireImmediately: true },
        )
    }

    public async submit(): Promise<void> {
        alert('D')
    }

    public setAmount(value: string): void {
        this.setState('amount', value)
    }

    public setType(value: StakingType): void {
        this.setState('type', value)
    }

    @computed
    public get type(): StakingType {
        return this._state.type
    }

    @computed
    public get amount(): string | undefined {
        return this._state.amount
    }

    @computed
    public get getAmount(): string | undefined {
        if (this.amount) {
            return new BigNumber(this.amount).dividedBy('3').toFixed()
        }
        return undefined
    }

    @computed
    public get getDepositStEverAmount(): string {
        return this._state.depositStEverAmount
    }

    @computed
    public get stakeDetails(): StEverVaultDetails | undefined {
        const details = this._data.contr?.details
        return details
    }

    @computed
    public get exchangeRate(): string | undefined {
        if (!this.stakeDetails) return undefined
        const { stEverSupply, totalAssets } = this.stakeDetails
        const stEverToEverRate = new BigNumber(stEverSupply).div(totalAssets)
        return new BigNumber(1).div(stEverToEverRate).toFixed(4)
    }

    private async estimateDepositStEverAmount(value: string): Promise<void> {
        let amount = new BigNumber(value).times(new BigNumber(10).pow(9)).toFixed(0, BigNumber.ROUND_DOWN)
        console.log(this._state.type)
        if (this._state.type === StakingType.Stake) {
            this.setState("depositStEverAmount", await this._data.contr.getDepositStEverAmount(amount))
        } else {
            this.setState("depositStEverAmount", await this._data.contr.getWithdrawEverAmount(amount))
        }
    }



}
