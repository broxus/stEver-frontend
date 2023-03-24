import { Direction, MainPage, MainPageResponse, StrategiesRequest, StrategiesResponse, StrategiesService, StrategyColumn, StrategyInfo, TvlRequest, TvlResponse, UsersService } from "@/apiClientCodegen";
import { AbstractStore } from "@broxus/js-core";
import { DateTime } from "luxon";
import { computed, makeObservable, reaction } from "mobx";

type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse
    strategyMainInfo: MainPage
}

// type TabelDepoolsDashboardPagination = {
//     currentPage: number;
//     limit: number;
//     totalCount?: number;
//     totalPages: number;
// }

type TabelDepoolsStoreState = {
    // isFetching?: boolean;
    // ordering: {
    //     column: StrategyColumn,
    //     direction: Direction,
    // };
    // pagination: TabelDepoolsDashboardPagination;
}

export class ChartStore extends AbstractStore<
    TabelDepoolsStoreData,
    TabelDepoolsStoreState
> {

    constructor() {
        super()
        makeObservable(this)

        reaction(
            () => { },
            async () => {
                this.getUsersTvlCharts({
                    from: Math.floor(DateTime.local().minus({
                        days: 30,
                    }).toUTC(undefined, {
                        keepLocalTime: false,
                    }).toSeconds()),
                    to: Math.floor(DateTime.local().toUTC(undefined, {
                        keepLocalTime: false,
                    }).toSeconds()),
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

    public async getUsersTvlCharts(params: TvlRequest): Promise<void> {
        const response = await UsersService.postUsersTvl(params)
        this.setData('tvlCharts', response)
    }


    public async getMainInfo(): Promise<void> {
        const response = await StrategiesService.getStrategiesMain()
        this.setData('strategyMainInfo', response.data)
    }


    @computed
    public get tvlCharts() {
        return this._data.tvlCharts
    }

    @computed
    public get strategyMainInfo() {
        return this._data.strategyMainInfo
    }
}