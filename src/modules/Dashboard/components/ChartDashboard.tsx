import * as React from 'react'

import BigNumber from 'bignumber.js'
import { Observer, observer } from 'mobx-react-lite'

import {
    Flex,
    Grid,
    Heading,
    Text,
    Tile,
    Width,
} from '@broxus/react-uikit'

import {
    FormattedCurrencyValue,
    FormattedTokenAmount,
} from '@broxus/react-components'

import Media from 'react-media'

import { ChartStore } from '../store/chartStore'
import { ChartTVL } from './charts/ChartTVL'
import { Placeholder } from '@/components/common/Placeholder'

import { ST_EVER_DECIMALS } from '@/config'
import { useStore } from '@/hooks/useStore'
import { RateChange } from '@/components/common/RateChange'

import './ChartDashboard.scss'
import { ChartAPY } from './charts/ChartAPY'
import { ChartPrice } from './charts/ChartPrice'
import { ChartHolders } from './charts/ChartHolders'

function ChartDashboardInner(): JSX.Element {

    const dashboard = useStore(ChartStore)

    return (
        <div className="chartDashboard">
            <Flex flexDirection="column" className="chartDashboard__container">
                <Heading component="h2" className="uk-margin-remove">
                    General information
                </Heading>
                <Media query={{ minWidth: 640 }}>
                    {matches => (matches ? (
                        <Grid gap="xsmall" match>
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
                                                    <Text>Current price</Text>
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
                                                                    value={new BigNumber(dashboard?.strategyMainInfo?.price).toFixed(2)}
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.priceDelta).div(dashboard?.strategyMainInfo?.price).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type="secondary" size="xsmall">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>APY</Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={30} width={100} />
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.apyDelta).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type="secondary" size="xsmall">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>Holders</Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={30} width={100} />
                                                                <span>
                                                                    <Placeholder height={20} width={35} />
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.holdersDelta).div(dashboard?.strategyMainInfo?.holders).times(100).toFixed(2)} />
                                                    }
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
                                    <ChartTVL />
                                    {/* <ChartAPY /> */}
                                    {/* <ChartPrice /> */}
                                    {/* <ChartHolders/> */}
                                </Tile>
                            </Width>
                        </Grid>
                    ) : (
                        <>
                            <Observer>
                                {() => (
                                    <>
                                        <Width size="1-1">
                                            <Tile type="secondary" size="xsmall" className="uk-margin-small-bottom">
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
                                            <Tile type="secondary" size="xsmall" className="uk-margin-small-bottom">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>Current price</Text>
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
                                                                    value={new BigNumber(dashboard?.strategyMainInfo?.price).toFixed(2)}
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.priceDelta).div(dashboard?.strategyMainInfo?.price).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type="secondary" size="xsmall" className="uk-margin-small-bottom">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>APY</Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={30} width={100} />
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.apyDelta).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                            <Tile type="secondary" size="xsmall" className="uk-margin-small-bottom">
                                                <Grid gap="xsmall" childWidth={1}>
                                                    <Text>Holders</Text>
                                                    {dashboard.isFetching ?
                                                        <>
                                                            <Text className='total'>
                                                                <Placeholder height={30} width={100} />
                                                                <span>
                                                                    <Placeholder height={20} width={35} />
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
                                                        <Placeholder height={20} width={35} />
                                                        :
                                                        <RateChange size="sm" value={new BigNumber(dashboard?.strategyMainInfo?.holdersDelta).div(dashboard?.strategyMainInfo?.holders).times(100).toFixed(2)} />
                                                    }
                                                </Grid>
                                            </Tile>
                                        </Width>
                                        <Width size="1-1">
                                            <Tile type="default" size="xsmall" className="uk-padding-remove">
                                                <Text component='h5' className="uk-margin-remove uk-padding-small">
                                                    TVL
                                                </Text>
                                            </Tile>
                                            <Tile type="default" size="xsmall" className="uk-padding-remove">
                                                <ChartTVL />
                                            </Tile>
                                        </Width>
                                    </>
                                )}
                            </Observer>
                        </>
                    ))}

                </Media>
            </Flex>
        </div>
    )
}

export const ChartDashboard = observer(ChartDashboardInner)
