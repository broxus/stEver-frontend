import { AbstractStore } from '@broxus/js-core'
import { uniqBy } from 'lodash'
import { DateTime } from 'luxon'
import { computed, makeObservable, reaction } from 'mobx'

import {
    MainPage, StrategiesService, StrategyPage, TvlRequest, TvlResponse, UsersService,
} from '@/apiClientCodegen'
import { useParams } from 'react-router-dom'
import { Params } from '@/routes'

type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse[]
    strategyMainInfo: StrategyPage
}

type TabelDepoolsStoreState = {
    pagination: {
        address: string;
        from: number;
        to: number;
    };
}

export class ChartStore extends AbstractStore<
    TabelDepoolsStoreData,
    TabelDepoolsStoreState
> {

    protected params = useParams<Params>()

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
                if (this.params.id)
                    await this.getUsersTvlCharts(
                        {
                            string: this.params.id,
                            requestBody: {
                                from: Math.floor(this._state?.pagination?.from || DateTime.local().minus({
                                    days: 30,
                                }).toUTC(undefined, {
                                    keepLocalTime: false,
                                }).toSeconds()),
                                to: Math.floor(this._state?.pagination?.to || DateTime.local().toUTC(undefined, {
                                    keepLocalTime: false,
                                }).toSeconds()),
                            }
                        }
                    )
            },
            { fireImmediately: true },
        )

        reaction(
            () => {
                this._state.pagination?.address
            },
            async () => {
                if (this._state?.pagination?.address)
                    this.getMainInfo(this._state?.pagination?.address)
            },
            { fireImmediately: true },
        )
    }

    public async getUsersTvlCharts({ string, requestBody }: {
        string: string,
        requestBody: TvlRequest
    }): Promise<void> {
        const response = await StrategiesService.postStrategiesTvl(string, requestBody)

        const data = this._data.tvlCharts.concat(response ?? [])
        this.setData('tvlCharts', data)
    }


    public async getMainInfo(string: string): Promise<void> {
        const response = await StrategiesService.getStrategiesMain1(string)
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

    @computed
    public get getCurrentAddress() {
        return this.params.id
    }

}
