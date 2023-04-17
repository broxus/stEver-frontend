import * as React from 'react'
import { Observer, observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'
import { useIntl } from 'react-intl'

import {
    Flex,
    Grid,
    Heading,
    Text,
    Tile,
    Width,
} from '@broxus/react-uikit'

import { FormattedCurrencyValue, FormattedTokenAmount } from '@broxus/react-components'
import Media from 'react-media'

import { ChartStore } from '../store/chartStore'
import { ST_EVER_DECIMALS } from '@/config'
import { useStore } from '@/hooks/useStore'

import { RateChange } from '@/components/common/RateChange'
import { Placeholder } from '@/components/common/Placeholder'

import { ChartAPY } from './charts/ChartAPY'
import { ChartHolders } from './charts/ChartHolders'
import { ChartPrice } from './charts/ChartPrice'
import { ChartTVL } from './charts/ChartTVL'

import './ChartDashboard.scss'


enum Charts {
    TVL = "TVL",
    Price = "Price",
    APY = "APY",
    Holders = "Holders",
    Untapped = "Untapped"
}

function ChartDashboardInner(): JSX.Element {
    const dashboard = useStore(ChartStore)
    const intl = useIntl()
    const [activeChart, setActiveChart] = React.useState<Charts>(Charts.TVL)
    return (
        <div className="chartDashboard">
            <Flex flexDirection="column" className="chartDashboard__container">
                <Heading component="h2" className="uk-margin-remove">
                    {intl.formatMessage({
                        id: 'GENERAL_INFORMATION',
                    })}
                </Heading>
                <Media query={{ minWidth: 640 }}>
                    {matches => (
                        <Grid gap="xsmall" match>
                            <Width size={matches ? "1-4" : "1-1"}>
                                <Observer>
                                    {() => (
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Tile type={activeChart === Charts.TVL ? "primary" : "secondary"} style={{ cursor: "pointer" }} size="xsmall"
                                                onClick={() => setActiveChart(Charts.TVL)}
                                            >
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'TVL',
                                                        })}
                                                    </Text>
                                                    <Text>
                                                        {dashboard.isFetching ?
                                                            <>
                                                                <Placeholder height={25} width={100} />
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

                                                                <span className='uk-margin-auto-vertical'>
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
                                                        <Placeholder height={17} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.tvlDelta).div(dashboard?.strategyMainInfo?.tvl).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type={activeChart === Charts.Price ? "primary" : "secondary"} style={{ cursor: "pointer" }} size="xsmall"
                                                onClick={() => setActiveChart(Charts.Price)}
                                            >
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'CURRENT_PRICE',
                                                        })}
                                                    </Text>
                                                    <Text>
                                                        {dashboard.isFetching ?
                                                            <>
                                                                <Placeholder height={25} width={100} />
                                                                <span>
                                                                    <Placeholder height={20} width={35} />
                                                                </span>
                                                            </>
                                                            :
                                                            <>
                                                                <FormattedTokenAmount
                                                                    value={new BigNumber(dashboard?.strategyMainInfo?.price).toString()}
                                                                    symbol="EVER"
                                                                    className='total'
                                                                />

                                                                <span>
                                                                    ~<FormattedCurrencyValue
                                                                        value={new BigNumber(dashboard?.strategyMainInfo?.price).times(dashboard.price).toFixed(2)}
                                                                    />
                                                                </span>
                                                            </>
                                                        }
                                                    </Text>
                                                    {dashboard.isFetching ?
                                                        <Placeholder height={17} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.priceDelta).div(dashboard?.strategyMainInfo?.price).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type={activeChart === Charts.APY ? "primary" : "secondary"} style={{ cursor: "pointer" }} size="xsmall"
                                                onClick={() => setActiveChart(Charts.APY)}
                                            >
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'APY',
                                                        })}
                                                    </Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={25} width={100} />
                                                                <span>
                                                                    <Placeholder height={20} width={35} />
                                                                </span>
                                                            </Text>
                                                        </>
                                                        :
                                                        <>
                                                            <Text className='total'>
                                                                {new BigNumber(dashboard?.strategyMainInfo?.apy).times(100).toFixed(2)}
                                                                %
                                                            </Text>
                                                        </>
                                                    }
                                                    {dashboard.isFetching ?
                                                        <Placeholder height={17} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.apyDelta).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type={activeChart === Charts.Holders ? "primary" : "secondary"} style={{ cursor: "pointer" }} size="xsmall"
                                                onClick={() => setActiveChart(Charts.Holders)}
                                            >
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'HOLDERS',
                                                        })}
                                                    </Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={25} width={100} />
                                                                <span>
                                                                    <Placeholder height={18} width={35} />
                                                                </span>
                                                            </Text>
                                                        </>
                                                        :
                                                        <>
                                                            <Text className='total'>
                                                                {dashboard?.strategyMainInfo?.holders}
                                                            </Text>
                                                        </>
                                                    }
                                                    {dashboard.isFetching ?
                                                        <Placeholder height={17} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.holdersDelta).div(dashboard?.strategyMainInfo?.holders).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type={activeChart === Charts.Untapped ? "primary" : "secondary"} style={{ cursor: "pointer" }} size="xsmall"
                                                onClick={() => setActiveChart(Charts.Untapped)}
                                            >
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>
                                                        {intl.formatMessage({
                                                            id: 'UNTAPPED_EVER',
                                                        })}
                                                    </Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={25} width={100} />
                                                            </Text>
                                                        </>
                                                        :
                                                        <>
                                                            <Text className='total'>
                                                                <FormattedTokenAmount
                                                                    decimals={ST_EVER_DECIMALS}
                                                                    value={dashboard?.strategyMainInfo?.availableAssets}
                                                                    symbol='EVER'
                                                                    className='total'
                                                                />
                                                            </Text>
                                                        </>
                                                    }
                                                </Grid>
                                            </Tile>
                                        </Grid>
                                    )}
                                </Observer>
                            </Width>
                            <Width size={matches ? "3-4" : "1-1"}>
                                <Tile type="default" size="xsmall" className="uk-padding-remove">
                                    <Text component='h5' className="uk-margin-remove uk-padding-small">
                                        {activeChart === Charts.TVL &&
                                            intl.formatMessage({
                                                id: 'TVL',
                                            })
                                        }
                                        {activeChart === Charts.Price &&
                                            intl.formatMessage({
                                                id: 'CURRENT_PRICE',
                                            })
                                        }
                                        {activeChart === Charts.APY &&
                                            intl.formatMessage({
                                                id: 'APY',
                                            })
                                        }
                                        {activeChart === Charts.Holders &&
                                            intl.formatMessage({
                                                id: 'HOLDERS',
                                            })
                                        }
                                        {activeChart === Charts.Untapped &&
                                            intl.formatMessage({
                                                id: 'UNTAPPED_EVER',
                                            })
                                        }

                                    </Text>
                                </Tile>
                                <Tile type="default" size="xsmall" className="uk-padding-remove">
                                    {activeChart === Charts.TVL && <ChartTVL />}
                                    {activeChart === Charts.Price && <ChartPrice />}
                                    {activeChart === Charts.APY && <ChartAPY />}
                                    {activeChart === Charts.Holders && <ChartHolders />}
                                    {activeChart === Charts.Untapped && <ChartHolders />}

                                </Tile>
                            </Width>
                        </Grid>
                    )}
                </Media>
            </Flex>
        </div>
    )
}

export const ChartDashboard = observer(ChartDashboardInner)
