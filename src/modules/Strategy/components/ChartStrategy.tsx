import * as React from 'react'
import { Chart, ExplorerAccountLink, FormattedCurrencyValue, FormattedTokenAmount, Icon } from '@broxus/react-components'
import {
    Breadcrumb,
    Card,
    Flex, Grid, Heading, Label, Text, Tile, Width,
    Link as LinkText
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
import { useTvmWalletContext } from '@broxus/react-modules'
import { Placeholder } from '@/components/common/Placeholder'

function ChartStrategyInner(): JSX.Element {

    const dashboard = useStore(ChartStore)
    const series = React.useRef<any>(null)
    const chart = React.useRef<any>(null)
    const { id } = useParams<Params>()
    const { wallet } = useTvmWalletContext()

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
            return `Ever ${formattedAmount(value)}${unit}`
        }
        return `Ever ${formattedAmount(price, undefined, {
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

                <Card className='chartDashboard--labels'>
                    <Label
                        type={dashboard?.strategyMainInfo?.priority === 'high' ? 'danger' : dashboard?.strategyMainInfo?.priority === 'medium' ? 'warning' : 'success'}
                    >
                        {dashboard?.strategyMainInfo?.priority.charAt(0).toUpperCase() + dashboard?.strategyMainInfo?.priority.slice(1)} efficiency
                    </Label>
                    <ExplorerAccountLink
                        baseUrl={wallet.network?.explorer?.baseUrl}
                        address={id}>
                        <Label>Strategy <Icon icon='externalLink' /></Label>
                    </ExplorerAccountLink>
                    <ExplorerAccountLink
                        baseUrl={wallet.network?.explorer?.baseUrl}
                        address={dashboard?.strategyMainInfo?.owner}>
                        <Label>Owner <Icon icon='externalLink' /></Label>
                    </ExplorerAccountLink>
                </Card>

                <Grid gap="xsmall" match className="chartDashboard--layout">
                    <Width size="1-4">
                        <Observer>
                            {() => (
                                <Grid gap="xsmall" childWidth={1}>
                                    <Tile type="secondary" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>TVL</Text>
                                            <Text>
                                                {dashboard.isFetching ?
                                                    <>
                                                        <Placeholder height={30} width={100} />
                                                        <span>
                                                            <Placeholder height={20} width={35} />
                                                        </span>
                                                    </>
                                                    :
                                                    <>
                                                        <FormattedTokenAmount
                                                            decimals={ST_EVER_DECIMALS}
                                                            value={dashboard?.strategyMainInfo?.tvl}
                                                            symbol='EVER'
                                                            className='total'
                                                        />

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
                                                    </>
                                                }
                                            </Text>
                                            {dashboard.isFetching ?
                                                <Placeholder height={20} width={35} />
                                                :
                                                <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.tvlDelta).div(dashboard?.strategyMainInfo?.tvl).times(100).toFixed(2)} />
                                            }
                                        </Grid>
                                    </Tile>
                                    <Tile type="secondary" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Fee</Text>
                                            <Text className='total'>
                                                {dashboard.isFetching ?
                                                    <>
                                                        <Placeholder height={30} width={100} />
                                                    </>
                                                    :
                                                    <>{dashboard.strategyDetails?.validatorRewardFraction ?? 0}%</>
                                                }
                                            </Text>
                                        </Grid>
                                    </Tile>
                                </Grid>
                            )}
                        </Observer>
                    </Width>
                    <Width size="3-4">
                        <Tile type="default" size="xsmall" className="uk-padding-remove">
                            <Text component='h5' className="uk-margin-remove uk-padding-small">
                                TVL
                            </Text>
                        </Tile>
                        <Tile type="default" size="xsmall" className="uk-padding-remove">
                            <Observer>
                                {() => (
                                    <Chart
                                        height={400} width={1000} style={{ height: '100%' }}
                                        ref={chart}
                                        onVisibleLogicalRangeChange={onVisibleLogicalRangeChange}
                                    >
                                        {/* {dashboard.isFetchingCharts && <Chart.Placeholder />} */}
                                        <Chart.Series
                                            ref={series}
                                            type="Area"
                                            // title={"Wawer"}
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
