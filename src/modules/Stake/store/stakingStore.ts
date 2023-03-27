import {
    AbstractStore, TvmWalletService, useRpcClient, useWalletsCache,
} from '@broxus/js-core'
import BigNumber from 'bignumber.js'
import {
    computed, makeObservable, reaction,
} from 'mobx'
import { formattedTokenAmount } from '@broxus/js-utils'

import { StEverVaultDetails } from '@/abi/types'
import { parseCurrency } from '@/utils/parseCurrency'

import { Staking } from '../models/staking'
import { ST_EVER_VAULT_ADDRESS_CONFIG, ST_EVER_DECIMALS, ST_EVER_TOKEN_ROOT_ADDRESS_CONFIG } from '@/config'
import { Address } from 'everscale-inpage-provider'

export enum StakingType {
    Stake = 'Stake',
    Unstake = 'Unstake',
}

type StakingStoreState = {
    amount?: string;
    type: StakingType;
    depositStEverAmount: string;
    stBalance: string;
}

type StakingStoreData = {
    modelStaking: Staking;
}


export class StakingStore extends AbstractStore<
    StakingStoreData,
    StakingStoreState
> {

    protected rpc = useRpcClient()
    protected walletsCache = useWalletsCache()

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
        super()
        makeObservable(this)

        this.setState('type', StakingType.Stake)
        this.setState('depositStEverAmount', '0');

        (async () => {
            const contr = await Staking.create(ST_EVER_VAULT_ADDRESS_CONFIG)
            this.setData('modelStaking', contr)
        })()

        reaction(
            () => this._state.amount,
            async amount => {
                if (amount) this.estimateDepositStEverAmount(amount)
            },
            { fireImmediately: true },
        )

        reaction(
            () => this._state.type,
            async () => {
                if (this._state.amount) this.estimateDepositStEverAmount(this._state.amount)

                await this.walletsCache.resolve(
                    this.wallet.address!,
                    new Address(ST_EVER_TOKEN_ROOT_ADDRESS_CONFIG)
                ).then((e) => {
                    this.setState("stBalance",
                        formattedTokenAmount(
                            e.balance,
                            this.wallet.currency.decimals,
                        ))

                })
            },
            { fireImmediately: true },
        )
    }

    public async submit(): Promise<void> {
        if (this.amount && this.wallet.account?.address) {
            const amount = parseCurrency(this.amount, ST_EVER_DECIMALS)
            if (this._state.type === StakingType.Stake) {
                await this._data.modelStaking.deposit(amount)
            } else {
                const depositPayload = await this._data.modelStaking.encodeDepositPayload()
                await this._data.modelStaking.transfer({
                    remainingGasTo: this.wallet.account?.address,
                    deployWalletValue: 0,
                    amount: amount,
                    notify: true,
                    recipient: new Address(ST_EVER_VAULT_ADDRESS_CONFIG),
                    payload: depositPayload,
                })
            }
        }
    }

    public setAmount(value: string): void {
        this.setState('amount', value)
    }

    public setType(value: StakingType): void {
        this.setState('type', value)
    }

    @computed
    public get maxAmount(): string {
        if (this.type === StakingType.Stake) {
            return formattedTokenAmount(
                this.wallet.balance,
                this.wallet.currency.decimals,
            )
        } else {
            return this._state.stBalance
        }

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
        const details = this._data.modelStaking?.details
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
        const amount = parseCurrency(value, ST_EVER_DECIMALS)
        if (this._state.type === StakingType.Stake) {
            this.setState('depositStEverAmount', await this._data.modelStaking.getDepositStEverAmount(amount))
        }
        else {
            this.setState('depositStEverAmount', await this._data.modelStaking.getWithdrawEverAmount(amount))
        }
    }


}
