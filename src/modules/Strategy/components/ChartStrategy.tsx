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
import Media from 'react-media'
import { useIntl } from 'react-intl'

function ChartStrategyInner(): JSX.Element {
    const intl = useIntl()
    const dashboard = useStore(ChartStore)
    const series = React.useRef<any>(null)
    const chart = React.useRef<any>(null)
    const { id } = useParams<Params>()
    const wallet = useTvmWalletContext()

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
                            days: 200,
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
            return `${formattedAmount(value)}${unit}`
        }
        return `${formattedAmount(price, undefined, {
            precision: 1,
        })}`
    }
    return (
        <div className="chartDashboard">
            <Flex flexDirection="column" className="chartDashboard__container">
                <Breadcrumb className="uk-margin-remove">
                    <Breadcrumb.Item>
                        <Link to={appRoutes.dashboard.path}>
                            {intl.formatMessage({
                                id: 'NAV_LINK_TEXT_DASHBOARD',
                            })}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a>
                            {intl.formatMessage({
                                id: 'STRATEGY',
                            })} {sliceAddress(id)}
                        </a>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Heading component="h2" className="uk-margin-remove">
                    {intl.formatMessage({
                        id: 'STRATEGY',
                    })}  {sliceAddress(id)}
                </Heading>

                <Card className='chartDashboard--labels'>
                    <Label
                        type={dashboard?.strategyMainInfo?.priority === 'high' ? 'success' : dashboard?.strategyMainInfo?.priority === 'medium' ? 'warning' : 'danger'}
                    >
                        {dashboard?.strategyMainInfo?.priority.charAt(0).toUpperCase() + dashboard?.strategyMainInfo?.priority.slice(1)}
                        {intl.formatMessage({
                            id: 'EFFICIENCY',
                        })}
                    </Label>
                    <ExplorerAccountLink
                        baseUrl={wallet.network?.explorer?.baseUrl}
                        address={id}>
                        <Label>
                            {intl.formatMessage({
                                id: 'STRATEGY',
                            })}
                            <Icon icon='externalLink' />
                        </Label>
                    </ExplorerAccountLink>
                    <ExplorerAccountLink
                        baseUrl={wallet.network?.explorer?.baseUrl}
                        address={dashboard?.strategyMainInfo?.owner}>
                        <Label>
                            {intl.formatMessage({
                                id: 'OWNER',
                            })}
                            <Icon icon='externalLink' />
                        </Label>
                    </ExplorerAccountLink>
                </Card>

                <Media query={{ minWidth: 640 }}>
                    {matches => (
                        <Grid gap="xsmall" match className="chartDashboard--layout">
                            <Width size={matches ? "1-4" : "1-1"}>
                                <Observer>
                                    {() => (
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Tile type="secondary" size="xsmall">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'TVL',
                                                        })}
                                                    </Text>
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
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'FEE',
                                                        })}
                                                    </Text>
                                                    <Text className='total'>
                                                        {!dashboard.strategyDetails?.validatorRewardFraction ?
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
                            <Width size={matches ? "3-4" : "1-1"}>
                                <Tile type="default" size="xsmall" className="uk-padding-remove">
                                    <Text component='h5' className="uk-margin-remove uk-padding-small">
                                        {intl.formatMessage({
                                            id: 'TVL',
                                        })}
                                    </Text>
                                </Tile>
                                <Tile type="default" size="xsmall" className="uk-padding-remove">
                                    <Observer>
                                        {() => (
                                            <Chart
                                                height={400} width={1000} style={{ height: matches ? '100%' : '260px' }}
                                                ref={chart}
                                                onVisibleLogicalRangeChange={onVisibleLogicalRangeChange}
                                            >
                                                {dashboard.isFetchingCharts && <Chart.Placeholder />}
                                                <Chart.Series
                                                    ref={series}
                                                    type="Area"
                                                    data={dashboard.tvlCharts}
                                                    lineColor="#2B63F1"
                                                    title={"EVER"}
                                                    priceFormat={{
                                                        formatter: usdPriceFormatter,
                                                        type: 'custom',
                                                    }}
                                                    priceScaleId="right"
                                                    lineType={0}
                                                />
                                            </Chart>
                                        )}
                                    </Observer>
                                </Tile>
                            </Width>
                        </Grid>
                    )}
                </Media>
            </Flex>
        </div >
    )
}

export const ChartStrategy = observer(ChartStrategyInner)
