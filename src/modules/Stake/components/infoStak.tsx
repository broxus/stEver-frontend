import * as React from 'react'
import './infoStak.scss'
import { Flex, Grid, Heading, Text } from '@broxus/react-uikit'

export function InfoStak(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' justifyContent='center'>
                <div className='infoStak'>
                    <Heading component='h2'>
                        Stake your EVERs
                    </Heading>
                </div>

                {/* <Grid divider={true}>
                    <Flex flexDirection='column' >
                        <Text component='h4'>24 876 944</Text>
                        <Text>EVER staked</Text>
                    </Flex>
                    <Flex flexDirection='column'>
                        <Text component='h4'>12%</Text>
                        <Text>Average APY</Text>
                    </Flex>
                    <Flex flexDirection='column'>
                        <Text component='h4'>16</Text>
                        <Text>Active stakers</Text>
                    </Flex>
                </Grid> */}
            </Flex >
        </>
    )
}
