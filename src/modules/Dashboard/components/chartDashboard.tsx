import * as React from 'react'
import './chartDashboard.scss'
import { Chart } from '@broxus/react-components'
import { Time } from 'lightweight-charts'
import { Flex, Grid, Heading, Text } from '@broxus/react-uikit';

export function ChartDashboard(): JSX.Element {
    const data = [{ value: 0, time: 1642425322 as Time }, { value: 8, time: 1642511722 as Time }, { value: 10, time: 1642598122 as Time }, { value: 20, time: 1642684522 as Time }, { value: 3, time: 1642770922 as Time }, { value: 43, time: 1642857322 as Time }, { value: 41, time: 1642943722 as Time }, { value: 43, time: 1643030122 as Time }, { value: 56, time: 1643116522 as Time }, { value: 46, time: 1643202922 as Time }];

    return (
        <>
            <div className="chartDashboard">
                <Flex flexDirection='column' className="chartDashboard__container">
                    <Heading component='h2'>
                        General information
                    </Heading>
                    <div className='chartDashboard__container--chartBoard'>
                        <div className='chartDashboard__container--chartBoard__info'>
                            <div className='chartDashboard__container--chartBoard__info--item'>
                                <Text>Current price</Text>
                                <Text>1.21 EVER <span>~ $0.13</span></Text>
                                <Text>8.81%</Text>
                            </div>
                            <div className='chartDashboard__container--chartBoard__info--item'>
                                <Text>TVL</Text>
                                <Text>1.21 EVER <span>~ $0.13</span></Text>
                                <Text>8.81%</Text>
                            </div>
                            <div className='chartDashboard__container--chartBoard__info--item'>
                                <Text>APY</Text>
                                <Text>1.21 EVER <span>~ $0.13</span></Text>
                                <Text>8.81%</Text>
                            </div>
                            <div className='chartDashboard__container--chartBoard__info--item'>
                                <Text>Holders</Text>
                                <Text>1.21 EVER <span>~ $0.13</span></Text>
                                <Text>8.81%</Text>
                            </div>
                        </div>
                        <div className='chartDashboard__container--chartBoard__chart'>
                            <Chart height={480} width={1000} style={{ height: 480 }} >
                                <Chart.Series type="Area" data={data} lineColor='#000' />
                            </Chart>
                        </div>
                    </div>
                </Flex>
            </div>
        </>
    )
}
