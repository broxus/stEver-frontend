import { AbstractStore } from '@broxus/js-core'
import { uniqBy } from 'lodash'
import { DateTime } from 'luxon'
import { computed, makeObservable, reaction } from 'mobx'

import {
    MainPage, StrategiesService, TvlRequest, TvlResponse, UsersService,
} from '@/apiClientCodegen'

type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse[]
    // {
    //     time: number;
    //     value: number;
    // }[]
    strategyMainInfo: MainPage
}

// type TabelDepoolsDashboardPagination = {
//     currentPage: number;
//     limit: number;
//     totalCount?: number; 
//     totalPages: number;
// }

type TabelDepoolsStoreState = {
    pagination: {
        from: number;
        to: number;
    };
}

export class ChartStore extends AbstractStore<
    TabelDepoolsStoreData,
    TabelDepoolsStoreState
> {

    constructor() {
        super()
        makeObservable(this)
        this.setData('tvlCharts', [])
        reaction(
            () => [
                this._state.pagination?.from,
                this._state.pagination?.to,
            ],
            async () => {
                await this.getUsersTvlCharts({
                    from: Math.floor(this._state?.pagination?.from || DateTime.local().minus({
                        days: 30,
                    }).toUTC(undefined, {
                        keepLocalTime: false,
                    }).toSeconds()),
                    to: Math.floor(this._state?.pagination?.to || DateTime.local().toUTC(undefined, {
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

        const data = this._data.tvlCharts.concat(response ?? [])
        this.setData('tvlCharts', data)
    }


    public async getMainInfo(): Promise<void> {
        const response = await StrategiesService.getStrategiesMain()
        this.setData('strategyMainInfo', response.data)
    }


    @computed
    public get tvlCharts() {
        return uniqBy(this._data.tvlCharts, 'timestamp').map<any>((item => ({
            time: (item.timestamp),
            value: parseFloat(item.tvl),
        }))).reverse()
    }

    @computed
    public get strategyMainInfo() {
        return this._data.strategyMainInfo
    }

}
