import { makeAutoObservable } from "mobx";

export enum StakingType {
    Stake, Unstake,
}

type State = {
    amount?: string;
    type: StakingType
    isLoading?: boolean;
    error?: string;
}

const initState: State = {
    type: StakingType.Stake,
}

export class StakingStore {

    protected state = initState


    constructor(

    ) {
        makeAutoObservable(this, {}, {
            autoBind: true,
        })
    }

    public async submit(): Promise<void> {

    }

    public setAmount(value: string): void {
        this.state.amount = value
    }

    public setType(value: StakingType): void {
        this.state.type = value
    }

    public get type(): StakingType {
        return this.state.type
    }

    public get amount(): string | undefined {
        return this.state.amount
    }

}