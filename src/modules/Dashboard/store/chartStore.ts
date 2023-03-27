import { AbstractStore, useCurrenciesApi } from '@broxus/js-core'
import { uniqBy } from 'lodash'
import { computed, makeObservable, reaction } from 'mobx'
import BigNumber from 'bignumber.js'

import {
    MainPage, StrategiesService, TvlRequest, TvlResponse, UsersService,
} from '@/apiClientCodegen'
import { ST_EVER_DECIMALS, WEVERRootAddress } from '@/config'


type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse[]
    strategyMainInfo: MainPage
    price: string
}

type TabelDepoolsStoreState = {

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
            () => { },
            async () => {
                this.getMainInfo()
            },
            { fireImmediately: true },
        )

        reaction(
            () => { },
            (async () => {
                const api = useCurrenciesApi()
                const price = await api.currenciesUsdtPrices.fetch(
                    undefined,
                    { method: 'POST' },
                    { currency_addresses: [WEVERRootAddress] ?? [] },
                )
                this.setData('price', price[WEVERRootAddress])
            }),
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
            value: parseFloat(new BigNumber(item.tvl ?? 0).shiftedBy(-ST_EVER_DECIMALS).toFixed()),
        }))).reverse()
    }

    @computed
    public get strategyMainInfo() {
        return this._data.strategyMainInfo
    }

    @computed
    public get price() {
        return this._data.price
    }

}
