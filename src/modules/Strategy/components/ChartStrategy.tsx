import * as React from 'react'
import { Chart, FormattedCurrencyValue, FormattedTokenAmount } from '@broxus/react-components'
import {
    Breadcrumb,
    Card,
    Flex, Grid, Heading, Label, Text, Tile, Width,
} from '@broxus/react-uikit'

import { RateChange } from '@/components/common/RateChange'

import { Observer, observer } from 'mobx-react-lite'

import { useStore } from '@/hooks/useStore'

import { ChartStore } from '../store/chartStore'

import { abbreviateNumber, debounce, formattedAmount, sliceAddress } from '@broxus/js-utils'
import { DateTime } from 'luxon'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'
import { Link, useParams } from 'react-router-dom'
import { Params, appRoutes } from '@/routes'

import './ChartStrategy.scss'

function ChartStrategyInner(): JSX.Element {

    const dashboard = useStore(ChartStore)
    const series = React.useRef<any>(null)
    const chart = React.useRef<any>(null)
    const { id } = useParams<Params>()

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

            dashboard.getUsersTvlCharts({
                string: dashboard.getCurrentAddress,
                requestBody: {
                    from,
                    to: barsInfo.from,
                },
            })
        }
    }, 50)

    React.useEffect(() => {
        dashboard.getUsersTvlCharts({
            string: dashboard.getCurrentAddress,
            requestBody: {
                from: Math.floor(
                    DateTime.local()
                        .minus({
                            days: 30,
                        })
                        .toUTC(undefined, {
                            keepLocalTime: false,
                        })
                        .toSeconds(),
                ),
                to: Math.floor(DateTime.local()
                    .toUTC(undefined, {
                        keepLocalTime: false,
                    })
                    .toSeconds()),
            },
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
                <Breadcrumb className="uk-margin-remove">
                    <Breadcrumb.Item>
                        <Link to={appRoutes.dashboard.path}>Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a>Strategy {sliceAddress(id)}</a>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Heading component="h2" className="uk-margin-remove">
                    Strategy {sliceAddress(id)}
                </Heading>
                {/* 
                <Card>
                    <Label type={"success"}>
                        High efficiency
                    </Label>
                    <Label>
                        Strategy
                    </Label>
                    <Label>
                        Owner
                    </Label>
                </Card> */}

                <Grid gap="xsmall" match>
                    <Width size="1-4">
                        <Observer>
                            {() => (
                                <Grid gap="xsmall" childWidth={1}>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>TVL</Text>
                                            <Text>
                                                <FormattedTokenAmount
                                                    decimals={ST_EVER_DECIMALS}
                                                    value={dashboard?.strategyMainInfo?.tvl}
                                                    symbol='EVER'
                                                />
                                                <br />
                                                <span>
                                                    ~<FormattedCurrencyValue
                                                        value={
                                                            new BigNumber(parseFloat(new BigNumber(dashboard?.strategyMainInfo?.tvl ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed()))
                                                                .times(dashboard.price)
                                                                .integerValue()
                                                                .toFixed()
                                                        }
                                                    />
                                                </span>
                                            </Text>
                                            <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.tvlDelta).div(dashboard?.strategyMainInfo?.tvl).times(100).toFixed(2)} />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Fee</Text>
                                            <Text>{dashboard.strategyDetails?.validatorRewardFraction}%</Text>
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
                                        />
                                    </Chart>
                                )}
                            </Observer>
                        </Tile>
                    </Width>
                </Grid>
            </Flex>
        </div >
    )
}

export const ChartStrategy = observer(ChartStrategyInner)
