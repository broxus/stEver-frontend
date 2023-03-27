import * as React from 'react'
import {
    Flex, Heading, Text, Tile,
} from '@broxus/react-uikit'

import './InfoStak.scss'
import { Observer, observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import { useStore } from '@/hooks/useStore'
import { ST_EVER_DECIMALS } from '@/config'

import { StakingStore } from '../store/stakingStore'

export function InfoStakInner(): JSX.Element {
    const staking = useStore(StakingStore)

    return (
        <Observer>
            {() => (
                <Flex flexDirection="column" justifyContent="center">
                    <Flex justifyContent="center">
                        <Heading component="h1">
                            Stake your EVERs
                        </Heading>
                    </Flex>

                    <Flex justifyContent="center" className="border">
                        <Tile className="uk-padding-remove">
                            <Text component="h4" className="uk-text-center uk-margin-remove">{parseFloat(new BigNumber(staking?.strategyMainInfo?.tvl ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed())}</Text>
                            <Text className="uk-text-center uk-margin-remove">EVER staked</Text>
                        </Tile>
                        <Tile className="uk-padding-remove">
                            <Text component="h4" className="uk-text-center uk-margin-remove">
                                {new BigNumber(staking?.strategyMainInfo?.apy ?? 0).times(100).integerValue().toFixed()}
                                %
                            </Text>
                            <Text className="uk-text-center uk-margin-remove">Average APY</Text>
                        </Tile>
                        <Tile className="uk-padding-remove">
                            <Text component="h4" className="uk-text-center uk-margin-remove">{staking?.strategyMainInfo?.holders}</Text>
                            <Text className="uk-text-center uk-margin-remove">Holders</Text>
                        </Tile>
                    </Flex>
                </Flex>
            )}
        </Observer>

    )
}

export const InfoStak = observer(InfoStakInner)