import { AbstractStore } from '@broxus/js-core'
import { computed, makeObservable, reaction } from 'mobx'

import {
    Direction, type StrategiesRequest, StrategiesService, StrategyColumn, type StrategyInfo,
} from '@/apiClientCodegen'

type TabelDepoolsStoreData = {
    depoolsStrategies: Array<StrategyInfo>;
}

type TabelDepoolsDashboardPagination = {
    currentPage: number;
    limit: number;
    totalCount?: number;
    totalPages: number;
}

type TabelDepoolsStoreState = {
    isFetching?: boolean;
    ordering: {
        column: StrategyColumn,
        direction: Direction,
    };
    pagination: TabelDepoolsDashboardPagination;
}

export class TabelDepoolsStore extends AbstractStore<
    TabelDepoolsStoreData,
    TabelDepoolsStoreState
> {

    constructor() {
        super()
        makeObservable(this)

        this.setState(() => ({
            ordering: {
                column: StrategyColumn.PRIORITY,
                direction: Direction.DESC,
            },
            pagination: {
                currentPage: 0,
                limit: 10,
                totalCount: 0,
                totalPages: 0,
            },
        }))

        reaction(
            () => { },
            async () => {
                this.getDepoolsStrategies({
                    depool: null,
                    limit: this._state.pagination.limit,
                    offset: this._state.pagination.currentPage * this._state.pagination.limit,
                    ordering: this._state.ordering,
                    validatorFeeGe: null,
                    validatorFeeLe: null,
                })
            },
            { fireImmediately: true },
        )
    }

    public async getDepoolsStrategies(params: StrategiesRequest): Promise<void> {
        // debugger
        this.setState('isFetching', true)
        const response = await StrategiesService.postStrategiesSearch(params)
        this.setData('depoolsStrategies', response.strategies)
        this.setState('isFetching', false)
        if (response.totalCount !== this._state.pagination.totalCount) {
            this.setState('pagination', {
                currentPage: this.pagination.currentPage,
                limit: this.pagination.limit,
                totalCount: response.totalCount,
                totalPages: Math.ceil(response.totalCount / this.pagination.limit),
            })
        }
    }

    @computed
    public get depoolsStrategies() {
        return this._data.depoolsStrategies
    }

    @computed
    public get ordering() {
        return this._state.ordering
    }

    @computed
    public get pagination() {
        return this._state.pagination
    }

    @computed
    public get isFetching() {
        return this._state.isFetching
    }

}
