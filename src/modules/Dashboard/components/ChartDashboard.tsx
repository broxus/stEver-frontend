import * as React from 'react'
import { Chart } from '@broxus/react-components'
import {
    Flex, Grid, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'


import './ChartDashboard.scss'
import { Observer, observer } from 'mobx-react-lite'
import { abbreviateNumber, debounce, formattedAmount } from '@broxus/js-utils'
import { DateTime } from 'luxon'
import BigNumber from 'bignumber.js'

import { ST_EVER_DECIMALS } from '@/config'
import { useStore } from '@/hooks/useStore'
import { RateChange } from '@/components/common/RateChange'

import { ChartStore } from '../store/chartStore'

function ChartDashboardInner(): JSX.Element {

    const dashboard = useStore(ChartStore)
    const series = React.useRef<any>(null)
    const chart = React.useRef<any>(null)

    const onVisibleLogicalRangeChange: any = debounce(logicalRange => {
        if (logicalRange == null) {
            return
        }
        const barsInfo = series.current?.api().barsInLogicalRange(logicalRange)
        if (
            barsInfo?.barsBefore !== undefined
            && Math.ceil(barsInfo.barsBefore) < 0
            && barsInfo?.from !== undefined
            && typeof barsInfo.from === 'number'
        ) {
            const from = (
                barsInfo.from + (
                    Math.ceil(barsInfo?.barsBefore) - 2
                ) * 86400
            )
            dashboard.getUsersTvlCharts({
                from,
                to: barsInfo.from,
            })
        }
    }, 50)

    React.useEffect(() => {
        dashboard.getUsersTvlCharts({
            from: Math.floor(DateTime.local()
                .minus({
                    days: 30,
                })
                .toUTC(undefined, {
                    keepLocalTime: false,
                })
                .toSeconds()),

            to: Math.floor(DateTime.local()
                .toUTC(undefined, {
                    keepLocalTime: false,
                })
                .toSeconds()),
        })
    }, [])

    React.useEffect(() => {
        const bs = (chart.current?.timeScale().width() ?? 860) / 30
        chart.current?.timeScale().applyOptions({
            barSpacing: bs,
            // minBarSpacing: bs,
        })

        chart.current?.priceScale('right').applyOptions({
            scaleMargins: {
                bottom: 0.025,
                top: 0.1,
            },
        })
    }, [chart.current])

    // React.useEffect(() => {
    //     series.current?.api().priceScale().applyOptions({
    //         scaleMargins: {
    //             bottom: 0.5,
    //             top: 0.1,
    //         },
    //     })
    // }, [series.current])

    // React.useEffect(() => {
    //     const bs = (chart.current?.timeScale().width() ?? 960) / 30 * 24
    //     chart.current?.timeScale().applyOptions({
    //         barSpacing: bs,
    //         minBarSpacing: bs,
    //     })
    // }, [chart.current])


    function usdPriceFormatter(price: any): string {
        if (price < 1e-8 || price < 0) {
            return ''
        }
        if (price >= 1000) {
            const abbreviated = abbreviateNumber(price)
            const value = abbreviated.substring(0, abbreviated.length - 1)
            const unit = abbreviateNumber(price).slice(-1)
            return `$${formattedAmount(value)}${unit}`
        }
        return `$${formattedAmount(price, undefined, {
            precision: 1,
        })}`
    }
    console.log(dashboard?.strategyMainInfo)

    return (
        <div className="chartDashboard">
            <Flex flexDirection="column" className="chartDashboard__container">
                <Heading component="h2">
                    General information
                </Heading>

                <Grid gap="xsmall" match>
                    <Width size="1-4">
                        <Observer>
                            {() => (
                                <Grid gap="xsmall" childWidth={1}>
                                    <Tile type="primary" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>TVL</Text>
                                            <Text>
                                                {parseFloat(new BigNumber(dashboard?.strategyMainInfo?.tvl ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed())}
                                                {' '}
                                                EVER

                                                <span>
                                                    ~ $
                                                    {' '}
                                                    {new BigNumber(dashboard?.strategyMainInfo?.tvl).times(dashboard.price).integerValue().toFixed()}
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.tvlDelta).div(dashboard?.strategyMainInfo?.tvl).times(100).toFixed(2)} />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Current price</Text>
                                            <Text>
                                                {new BigNumber(dashboard?.strategyMainInfo?.price).toFixed(2)}
                                                {' '}
                                                EVER
                                                <span>
                                                    ~ $
                                                    {new BigNumber(dashboard?.strategyMainInfo?.price).times(dashboard.price).toFixed(2)}

                                                </span>
                                            </Text>
                                            <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.priceDelta).div(dashboard?.strategyMainInfo?.price).times(100).toFixed(2)} />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>APY</Text>
                                            <Text>
                                                {new BigNumber(dashboard?.strategyMainInfo?.apy).times(100).toFixed(2)}
                                                %
                                            </Text>
                                            <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.apyDelta).times(100).toFixed(2)} />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Holders</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.holders}
                                            </Text>
                                            <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.holdersDelta).div(dashboard?.strategyMainInfo?.holders).times(100).toFixed(2)} />
                                        </Grid>
                                    </Tile>
                                </Grid>
                            )}
                        </Observer>
                    </Width>
                    <Width size="3-4">
                        <Tile type="default" size="xsmall" className="uk-padding-remove">
                            <Observer>
                                {() => (
                                    <Chart
                                        height={480} width={1000} style={{ height: '100%' }}
                                        ref={chart}
                                        onVisibleLogicalRangeChange={onVisibleLogicalRangeChange}
                                    >
                                        <Chart.Series
                                            ref={series}
                                            type="Area"
                                            data={dashboard.tvlCharts}
                                            lineColor="#2B63F1"

                                            priceFormat={{
                                                formatter: usdPriceFormatter,
                                                type: 'custom',
                                            }}
                                            priceScaleId="right"
                                        // visible={dashboard?.tvlCharts.length > 0}                                            
                                        // data={dashboard?.tvlCharts.map((d => (
                                        //     { time: d.timestamp, value: parseInt(d.tvl) }
                                        // ))).reverse()}
                                        />
                                    </Chart>
                                )}
                            </Observer>
                        </Tile>
                    </Width>
                </Grid>
            </Flex>
        </div>
    )
}

export const ChartDashboard = observer(ChartDashboardInner)