import { AbstractStore, useCurrenciesApi, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { uniqBy } from 'lodash'
import { computed, makeObservable, reaction } from 'mobx'
import { useParams } from 'react-router-dom'

import {
    StrategiesService, StrategyPage, TvlRequest, TvlResponse,
} from '@/apiClientCodegen'
import { Params } from '@/routes'
import { Strategy } from '../models/strategy'
import { Address } from 'everscale-inpage-provider'
import { GetDePoolInfo, GetRounds, StrategyDePool } from '@/abi/types'
import { WEVERRootAddress } from '@/config'

type TabelDepoolsStoreData = {
    tvlCharts: TvlResponse[]
    strategyMainInfo: StrategyPage
    modelStrategy: Strategy
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

    protected params = useParams<Params>()
    protected rpc = useRpcProvider()

    constructor() {
        super()
        makeObservable(this)
        this.setData('tvlCharts', []);

        (async () => {
            const contr = await Strategy.create(new Address(this.params.id), this.rpc)
            this.setData('modelStrategy', contr)
        })()

        reaction(
            () => {
                this.params.id
            },
            async () => {
                if (this.params.id) this.getMainInfo(this.params.id)
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

    public async getUsersTvlCharts({ string, requestBody }: {
        string: string,
        requestBody: TvlRequest
    }): Promise<void> {
        this.setState("isFetchingCharts", true)
        const response = await StrategiesService.postStrategiesTvl(string, requestBody)
        const data = this._data.tvlCharts.concat(response ?? [])
        this.setData('tvlCharts', data)
        this.setState("isFetchingCharts", false)
    }


    public async getMainInfo(string: string): Promise<void> {
        this.setState("isFetching", true)
        const response = await StrategiesService.getStrategiesMain1(string)
        this.setData('strategyMainInfo', response.data)
        this.setState("isFetching", false)
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

    @computed
    public get strategyDetails(): GetDePoolInfo | undefined {
        const details = this._data?.modelStrategy?.details
        return details
    }

    @computed
    public get strategyRounds(): GetRounds | undefined {
        const details = this._data?.modelStrategy?.rounds
        return details
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
