import { Direction, StrategiesService, SystemTransactionResponse, SystemTransactionsKind, SystemTransactionsOrdering, SystemsTransactionsRequest, SystemsTransactionsResponse, UserTransactionColumn, UserTransactionResponse, UserTransactionsKind, UserTransactionsOrdering, UsersTransactionsRequest } from "@/apiClientCodegen";
import { AbstractStore } from "@broxus/js-core";
import { computed, makeObservable, reaction } from "mobx";

type StrategiesTransactionsStoreData = {
    transactions: Array<SystemTransactionResponse>;
}

type StrategiesTransactionsDashboardPagination = {
    currentPage: number;
    limit: number;
    totalCount?: number;
    totalPages: number;
}

type StrategiesTransactionsStoreState = {
    isFetching?: boolean;
    ordering: SystemTransactionsOrdering
    pagination: StrategiesTransactionsDashboardPagination;
}

export class StrategiesTransactionsStore extends AbstractStore<
    StrategiesTransactionsStoreData,
    StrategiesTransactionsStoreState
> {

    constructor() {
        super()
        makeObservable(this)

        this.setState(() => ({
            // ordering: {
            //     column: UserTransactionColumn.CREATED_AT,
            //     direction: Direction.DESC,
            // },
            pagination: {
                currentPage: 0,
                limit: 10,
                totalCount: 0,
                totalPages: 0,
            }
        }))

        reaction(
            () => [
                this._state.ordering,
                this._state.pagination,
            ],
            async () => {
                this.getTransactions({
                    kind: SystemTransactionsKind.DEPOSIT,
                    limit: this._state.pagination.limit,
                    offset: this._state.pagination.currentPage * this._state.pagination.limit,
                    ordering: this._state.ordering,
                    strategy: null
                })
            },
            { fireImmediately: true },
        )
    }

    public async getTransactions(params: SystemsTransactionsRequest): Promise<void> {
        const response = await StrategiesService.postStrategiesTransactionsSearch(params)
        this.setData('transactions', response.transactions)
        if (response.totalCount !== this._state.pagination.totalCount) {
            this.setState("pagination", {
                currentPage: this.pagination.currentPage,
                limit: this.pagination.limit,
                totalCount: response.totalCount,
                totalPages: response.totalCount / this.pagination.limit,
            })
        }
    }

    @computed
    public get transactions() {
        return this._data.transactions
    }

    // @computed
    // public get ordering() {
    //     return this._state.ordering
    // }

    @computed
    public get pagination() {
        return this._state.pagination
    }

    @computed
    public get isFetching() {
        return this._state.isFetching
    }
}