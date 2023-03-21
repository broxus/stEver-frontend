import { ProviderContractWrapper } from "@broxus/js-core";
import { StakingUtils } from "./utils";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { StEverVaultDetails } from "@/abi/types";
import { makeAutoObservable, runInAction } from "mobx";

type StakingType = {
    details?: StEverVaultDetails
}

const initState: StakingType = {
    
}

export class Staking extends ProviderContractWrapper<
    StakingType
> {

    public state = initState

    public static Utils = StakingUtils

    constructor(
        address: Address | string,
    ) {
        super(address)
    }

    public static async create(
        address: Address | string,
    ): Promise<Staking> {
        const staking = new Staking(address)
        const details = await staking.getStakeDetails()
        staking.setData("details", details)
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

    public async encodeDepositPayload(): Promise<string> {
        return Staking.Utils._encodeDepositPayload(this.address)
    }
}