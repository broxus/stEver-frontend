import * as React from 'react'
import './infoStak.scss'
import { Flex, Grid, Heading, Text, Tile } from '@broxus/react-uikit'

export function InfoStak(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' justifyContent='center'>
                <Flex justifyContent='center'>
                    <Heading component='h1'>
                        Stake your EVERs
                    </Heading>
                </Flex>

                <Flex justifyContent='center' className='border'>
                    <Tile size='xsmall'>
                        <Text component='h4' className='uk-text-center uk-margin-small-bottom' >24 876</Text>
                        <Text className='uk-text-center uk-margin-remove'>EVER staked</Text>
                    </Tile>
                    <Tile size='xsmall'>
                        <Text component='h4' className='uk-text-center uk-margin-small-bottom'>12%</Text>
                        <Text className='uk-text-center uk-margin-remove'>Average APY</Text>
                    </Tile>
                    <Tile size='xsmall'>
                        <Text component='h4' className='uk-text-center uk-margin-small-bottom'>16</Text>
                        <Text className='uk-text-center uk-margin-remove'>Active stakers</Text>
                    </Tile>
                </Flex>
            </Flex >
        </>
    )
}
