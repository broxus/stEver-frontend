import * as React from 'react'
import { Chart } from '@broxus/react-components'
import {
    Flex, Grid, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'

import { dataСharts } from './_.mock'
import { RateChange } from '@/components/common/RateChange'

import './ChartDashboard.scss'

export function ChartDashboard(): JSX.Element {

    return (
        <div className="chartDashboard">
            <Flex flexDirection="column" className="chartDashboard__container">
                <Heading component="h2">
                    General information
                </Heading>
                <Grid gap="xsmall" match>
                    <Width size="1-4">
                        <Grid gap="xsmall" childWidth={1}>
                            <Tile type="primary" size="xsmall">
                                <Grid gap="xsmall" childWidth={1}>
                                    <Text>Current price</Text>
                                    <Text>
                                        1.21 EVER
                                        <span>~ $0.13</span>
                                    </Text>
                                    <RateChange size="sm" value="8.81" />
                                </Grid>
                            </Tile>
                            <Tile type="default" size="xsmall">
                                <Grid gap="xsmall" childWidth={1}>
                                    <Text>TVL</Text>
                                    <Text>
                                        1.21 EVER
                                        <span>~ $0.13</span>
                                    </Text>
                                    <RateChange size="sm" value="8.81" />
                                </Grid>
                            </Tile>
                            <Tile type="default" size="xsmall">
                                <Grid gap="xsmall" childWidth={1}>
                                    <Text>APY</Text>
                                    <Text>
                                        1.21 EVER
                                        <span>~ $0.13</span>
                                    </Text>
                                    <RateChange size="sm" value="8.81" />
                                </Grid>
                            </Tile>
                            <Tile type="default" size="xsmall">
                                <Grid gap="xsmall" childWidth={1}>
                                    <Text>Holders</Text>
                                    <Text>
                                        1.21 EVER
                                        <span>~ $0.13</span>
                                    </Text>
                                    <RateChange size="sm" value="8.81" />
                                </Grid>
                            </Tile>
                        </Grid>
                    </Width>
                    <Width size="3-4">
                        <Tile type="default" size="xsmall" className="uk-padding-remove">
                            <Chart height={480} width={1000} style={{ height: '100%' }}>
                                <Chart.Series type="Area" data={dataСharts} lineColor="#2B63F1" />
                            </Chart>
                        </Tile>
                    </Width>
                </Grid>
            </Flex>
        </div>
    )
}
