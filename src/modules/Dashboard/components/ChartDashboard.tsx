import * as React from 'react'
import { Chart } from '@broxus/react-components'
import {
    Flex, Grid, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'

import { RateChange } from '@/components/common/RateChange'

// import { dataСharts } from './_.mock'

import './ChartDashboard.scss'
import { Observer, observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'
import { ChartStore } from '../store/chartStore'

function ChartDashboardInner(): JSX.Element {

    const dashboard = useStore(ChartStore)
    console.log(dashboard.tvlCharts)

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
                                                {dashboard?.strategyMainInfo?.tvl} EVER
                                                <span>~ ${dashboard?.strategyMainInfo?.tvlDelta}</span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Current price</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.price} EVER
                                                <span>~ ${dashboard?.strategyMainInfo?.priceDelta}</span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>APY</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.apy}EVER
                                                <span>~ ${dashboard?.strategyMainInfo?.apyDelta}</span>
                                            </Text>
                                            <RateChange size="sm" value="8.81" />
                                        </Grid>
                                    </Tile>
                                    <Tile type="default" size="xsmall">
                                        <Grid gap="xsmall" childWidth={1}>
                                            <Text>Holders</Text>
                                            <Text>
                                                {dashboard?.strategyMainInfo?.holders} EVER
                                                <span>~ ${dashboard?.strategyMainInfo?.holdersDelta}</span>
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
                                    <Chart height={480} width={1000} style={{ height: '100%' }}>
                                        {/* <Chart.Series type="Area" data={dataСharts} lineColor="#2B63F1" /> */}
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
