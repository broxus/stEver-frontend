import {
    AbstractStore, TvmWalletService, useRpcClient, useRpcProvider,
} from '@broxus/js-core'
import BigNumber from 'bignumber.js'
import {
    computed, makeObservable, reaction,
} from 'mobx'
import { formattedTokenAmount } from '@broxus/js-utils'
import { Address } from 'everscale-inpage-provider'

import { StEverVaultDetails } from '@/abi/types'
import { parseCurrency } from '@/utils'
import { ST_EVER_VAULT_ADDRESS_CONFIG, ST_EVER_DECIMALS, ST_EVER_TOKEN_ROOT_ADDRESS_CONFIG } from '@/config'
import { MainPage, StrategiesService } from '@/apiClientCodegen'

import { Staking } from '../models/staking'
import { useWalletsCache } from '@/hooks/useWalletsCache'

export enum StakingType {
    Stake = 'Stake',
    Unstake = 'Unstake',
}

type StakingStoreState = {
    amount?: string;
    type: StakingType;
    depositStEverAmount: string;
    isFetching?: boolean;
    isFetchingForm?: boolean;
}

type StakingStoreData = {
    modelStaking: Staking;
    strategyMainInfo: MainPage
    stBalance: string;
}


export class StakingStore extends AbstractStore<
    StakingStoreData,
    StakingStoreState
> {

    protected rpc = useRpcProvider()

    protected walletsCache = useWalletsCache(this.rpc)

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
        super()
        makeObservable(this)

        this.setState('type', StakingType.Stake)
        this.setState('depositStEverAmount', '0');

        (async () => {
            const contr = await Staking.create(ST_EVER_VAULT_ADDRESS_CONFIG, this.rpc)
            this.setData('modelStaking', contr)
        })()

        reaction(
            () => this._state.amount,
            async amount => {
                this.estimateDepositStEverAmount(amount || '0')
            },
            { fireImmediately: false },
        )

        reaction(
            () => this._state.type,
            async () => {
                if (this._state.amount) this.estimateDepositStEverAmount(this._state.amount)
                await this.walletsCache.resolve(
                    this.wallet.address!,
                    new Address(ST_EVER_TOKEN_ROOT_ADDRESS_CONFIG),
                ).then(e => {
                    this.setData(
                        'stBalance',
                        e.balance ? e.balance : "0",
                    )

                })
            },
            { fireImmediately: true },
        )

        reaction(
            () => { },
            async () => {
                this.getMainInfo()
            },
            { fireImmediately: true },
        )
    }

    public async submit(): Promise<void> {
        if (this.amount && this.wallet.account?.address) {
            const amount = parseCurrency(this.amount, ST_EVER_DECIMALS)
            if (this._state.type === StakingType.Stake) {
                await this._data.modelStaking.deposit(amount, this.wallet.account.address)
            }
            else {
                const address = await this._data.modelStaking.getTokenWallet(
                    new Address(ST_EVER_TOKEN_ROOT_ADDRESS_CONFIG),
                    this.wallet.account.address,
                )

                const depositPayload = await this._data.modelStaking.encodeDepositPayload()
                await this._data.modelStaking.transfer(address, this.wallet.account.address, {
                    remainingGasTo: this.wallet.account?.address,
                    deployWalletValue: 0,
                    amount,
                    notify: true,
                    recipient: new Address(ST_EVER_VAULT_ADDRESS_CONFIG),
                    payload: depositPayload,
                })
            }
        }
    }

    public async getMainInfo(): Promise<void> {
        this.setState("isFetching", true)
        const response = await StrategiesService.getStrategiesMain()
        this.setData('strategyMainInfo', response.data)
        this.setState("isFetching", false)
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
            return new BigNumber(this.wallet.balance).shiftedBy(-ST_EVER_DECIMALS).minus(10).toFixed()
        }
        return new BigNumber(this._data.stBalance).shiftedBy(-ST_EVER_DECIMALS).toFixed()
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
    public get strategyMainInfo() {
        return this._data.strategyMainInfo
    }

    @computed 
    public get exchangeRate(): string | undefined {
        if (!this.stakeDetails) return undefined
        const { stEverSupply, totalAssets } = this.stakeDetails
        const stEverToEverRate = new BigNumber(stEverSupply).div(totalAssets)
        return new BigNumber(1).div(stEverToEverRate).toFixed(4)
    }

    @computed
    public get isFetching(): boolean | undefined {
        return this._state.isFetching
    }

    @computed
    public get isFetchingForm(): boolean | undefined {
        return this._state.isFetchingForm
    }
    

    private async estimateDepositStEverAmount(value: string): Promise<void> {
        this.setState("isFetchingForm", true)
        const amount = parseCurrency(value, ST_EVER_DECIMALS) || '0'
        if (this._state.type === StakingType.Stake) {
            this.setState('depositStEverAmount', await this._data.modelStaking.getDepositStEverAmount(amount))
        }
        else {
            this.setState('depositStEverAmount', await this._data.modelStaking.getWithdrawEverAmount(amount))
        }
        this.setState("isFetchingForm", false)
    }


}
