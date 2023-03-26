import * as React from 'react'
import { Chart } from '@broxus/react-components'
import {
    Flex, Grid, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'

import { RateChange } from '@/components/common/RateChange'

import './ChartDashboard.scss'
import { Observer, observer } from 'mobx-react-lite'

import { useStore } from '@/hooks/useStore'

import { ChartStore } from '../store/chartStore'

import { abbreviateNumber, debounce, formattedAmount } from '@broxus/js-utils'

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
                ) * (
                    86400
                )
            )
            dashboard.setState('pagination', {
                from,
                to: barsInfo.from,
            })
        }
    }, 50)

    React.useEffect(() => {
        series.current?.api().priceScale().applyOptions({
            scaleMargins: {
                bottom: 0.5,
                top: 0.1,
            },
        })
    }, [series.current])

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
                                                {dashboard?.strategyMainInfo?.tvl}
                                                {' '}
                                                EVER
                                                <span>
                                                    ~ $
                                                    {dashboard?.strategyMainInfo?.tvlDelta}
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Current price</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.price}
                                                {' '}
                                                EVER
                                                <span>
                                                    ~ $
                                                    {dashboard?.strategyMainInfo?.priceDelta}
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>APY</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.apy}
                                                EVER
                                                <span>
                                                    ~ $
                                                    {dashboard?.strategyMainInfo?.apyDelta}
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Holders</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.holders}
                                                {' '}
                                                EVER
                                                <span>
                                                    ~ $
                                                    {dashboard?.strategyMainInfo?.holdersDelta}
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
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
                                            priceScaleId="left"
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
