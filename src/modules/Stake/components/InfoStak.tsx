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
import { FormattedTokenAmount } from '@broxus/react-components'
import { Placeholder } from '@/components/common/Placeholder'
import Media from 'react-media'
import { useIntl } from 'react-intl'

export function InfoStakInner(): JSX.Element {
    const staking = useStore(StakingStore)
    const intl = useIntl()
    return (
        <Observer>
            {() => (
                <Flex flexDirection="column" justifyContent="center">
                    <Flex justifyContent="center" className={"uk-margin-bottom"}>
                        <Heading component="h1">
                            {intl.formatMessage({
                                id: 'STAKE_YOUR_EVERS',
                            })}
                        </Heading>
                    </Flex>

                    <Media query={{ minWidth: 640 }}>
                        <Flex justifyContent="center" className="border">
                            <Tile className="uk-padding-remove">
                                <Text component="h4" className="uk-text-center uk-margin-remove">
                                    {staking?.isFetching ?
                                        <Placeholder height={30} width={100} />
                                        :
                                        <FormattedTokenAmount
                                            decimals={ST_EVER_DECIMALS}
                                            value={staking?.strategyMainInfo?.tvl}
                                        />
                                    }

                                </Text>
                                <Text className="uk-text-center uk-margin-remove">
                                    {intl.formatMessage({
                                        id: 'EVER_STAKED',
                                    })}
                                </Text>
                            </Tile>
                            <Tile className="uk-padding-remove">
                                <Text component="h4" className="uk-text-center uk-margin-remove">
                                    {staking?.isFetching ?
                                        <Placeholder height={30} width={100} />
                                        :
                                        <>{new BigNumber(staking?.strategyMainInfo?.apy ?? 0).times(100).toFixed(2)} %</>
                                    }
                                </Text>
                                <Text className="uk-text-center uk-margin-remove">
                                    {intl.formatMessage({
                                        id: 'AVERAGE_APY',
                                    })}
                                </Text>
                            </Tile>
                            <Tile className="uk-padding-remove">
                                <Text component="h4" className="uk-text-center uk-margin-remove">
                                    {staking?.isFetching ?
                                        <Placeholder height={30} width={100} />
                                        :
                                        <>
                                            {staking?.strategyMainInfo?.holders ?? 0}
                                        </>
                                    }
                                </Text>
                                <Text className="uk-text-center uk-margin-remove">
                                    {intl.formatMessage({
                                        id: 'HOLDERS',
                                    })}
                                </Text>
                            </Tile>
                        </Flex>
                    </Media>
                </Flex>
            )}
        </Observer>

    )
}

export const InfoStak = observer(InfoStakInner)
