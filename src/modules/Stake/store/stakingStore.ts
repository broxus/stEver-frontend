import { StEverVaultDetails } from "@/abi/types";
import { AbstractStore, TvmWalletService, useRpcClient, useRpcProvider } from "@broxus/js-core";
import BigNumber from "bignumber.js";
import { computed, makeAutoObservable, makeObservable, observable, reaction } from "mobx";
import { StakingUtils } from "../models/utils";
import { Staking } from "../models/staking";
import { ST_EVER_VAULT_ADDRESS_CONFIG } from "@/constants";

export enum StakingType {
    Stake, Unstake,
}

type StakingStoreState = {
    amount?: string;
    type: StakingType
    isLoading?: boolean;
    error?: string;
}

type StakingStoreData = {
    contr: Staking
}



export class StakingStore extends AbstractStore<
    StakingStoreData,
    StakingStoreState
> {

    protected rpc = useRpcClient()

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
        super()
        makeObservable(this);

        this.setState("type", StakingType.Stake);

        (async () => {
            const contr = await Staking.create(ST_EVER_VAULT_ADDRESS_CONFIG)
            this.setData("contr", contr)
        })();
    }

    public async submit(): Promise<void> {
        alert("D")
    }

    public setAmount(value: string): void {
        this.setState("amount", value);
    }

    public setType(value: StakingType): void {
        this.setState("type", value);
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
            return new BigNumber(this.amount).dividedBy("3").toFixed()
        }
        return undefined
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


}