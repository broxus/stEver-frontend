import { AbstractStore, useCurrenciesApi } from '@broxus/js-core'
import { uniqBy } from 'lodash'
import { computed, makeObservable, reaction } from 'mobx'
import BigNumber from 'bignumber.js'

import {
    ApyResponse,
    HoldersResponse,
    MainPage, PriceResponse, StrategiesService, TvlRequest, TvlResponse, UsersService,
} from '@/apiClientCodegen'
import { ST_EVER_DECIMALS, WEVERRootAddress } from '@/config'


type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse[]
    priceCharts: PriceResponse[]
    apyCharts: ApyResponse[]
    holdersCharts: HoldersResponse[]
    strategyMainInfo: MainPage
    price: string
}

type TabelDepoolsStoreState = {
    isFetching?: boolean;
    isFetchingCharts?: boolean;
}

export class ChartStore extends AbstractStore<
    TabelDepoolsStoreData,
    TabelDepoolsStoreState
> {

    constructor() {
        super()
        makeObservable(this)
        this.setData('tvlCharts', [])
        this.setData('priceCharts', [])
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
        this.setState("isFetchingCharts", true)
        const response = await UsersService.postUsersTvl(params)
        const data = this._data.tvlCharts.concat(response ?? [])
        this.setData('tvlCharts', data)
        this.setState("isFetchingCharts", false)
    }

    public async getUsersPriceCharts(params: TvlRequest): Promise<void> {
        const response = await UsersService.postUsersPrice(params)
        const data = this._data.priceCharts.concat(response ?? [])
        this.setData('priceCharts', data)
    }

    public async getUsersAPYCharts(params: TvlRequest): Promise<void> {
        const response = await UsersService.postUsersApy(params)
        const data = this._data.apyCharts.concat(response ?? [])
        this.setData('apyCharts', data)
    }

    public async getUsersHoldersCharts(params: TvlRequest): Promise<void> {
        const response = await UsersService.postUsersHolders(params)
        const data = this._data.holdersCharts.concat(response ?? [])
        this.setData('holdersCharts', data)
    }

    public async getMainInfo(): Promise<void> {
        this.setState("isFetching", true)
        const response = await StrategiesService.getStrategiesMain()
        this.setData('strategyMainInfo', response.data)
        this.setState("isFetching", false)
    }


    @computed
    public get tvlCharts() {
        return uniqBy(this._data.tvlCharts, 'timestamp').map<any>((item => ({
            time: (item.timestamp),
            value: parseFloat(new BigNumber(item.tvl ?? 0).shiftedBy(-ST_EVER_DECIMALS).toFixed()),
        }))).reverse()
    }

    @computed
    public get priceCharts() {
        return uniqBy(this._data.priceCharts, 'timestamp').map<any>((item => ({
            time: (item.timestamp),
            value: parseFloat(new BigNumber(item.price ?? 0).shiftedBy(-ST_EVER_DECIMALS).toFixed()),
        }))).reverse()
    }

    @computed
    public get apyCharts() {
        return uniqBy(this._data.apyCharts, 'timestamp').map<any>((item => ({
            time: (item.timestamp),
            value: parseFloat(new BigNumber(item.apy ?? 0).shiftedBy(-ST_EVER_DECIMALS).toFixed()),
        }))).reverse()
    }

    @computed
    public get holdersCharts() {
        return uniqBy(this._data.holdersCharts, 'timestamp').map<any>((item => ({
            time: (item.timestamp),
            value: parseFloat(new BigNumber(item.holder ?? 0).shiftedBy(-ST_EVER_DECIMALS).toFixed()),
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

    @computed
    public get isFetchingCharts() {
        return this._state.isFetchingCharts
    }

    @computed
    public get isFetching() {
        return this._state.isFetching
    }

}
