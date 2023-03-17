export enum StakingType {
    Deposit, Withdraw,
}

type State = {
    amount?: string;
    type: StakingType
    isLoading?: boolean;
    error?: string;
}

const initState: State = {
    type: StakingType.Deposit,
}

export class StakingStore {

}