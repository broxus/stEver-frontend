import * as React from 'react'
import { Accordion, Flex, Text, Tile } from '@broxus/react-uikit'

import './FaqStak.scss'
import { Placeholder } from '@/components/common/Placeholder'
import { FormattedTokenAmount } from '@broxus/react-components'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'
import { StakingStore } from '../store/stakingStore'
import { useStore } from '@/hooks/useStore'
import Media from 'react-media'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

export function FaqStak(): JSX.Element {
    const staking = useStore(StakingStore)
    const intl = useIntl()
    return (
        <>
            <Observer>
                {() => (
                    <>
                        <Media query={{ maxWidth: 640 }}>
                            <>
                                <Flex justifyContent="center" flexDirection='column' className="border">
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
                            </>
                        </Media>
                    </>
                )}
            </Observer>
            <Accordion>
                <Accordion.Item header="How long does it take to stake/unstake tokens?">
                    <Text component="p">
                        {intl.formatMessage({
                            id: 'DEPOSITS_ARE_CREDITED',
                        })}
                    </Text>
                </Accordion.Item>
                <Accordion.Item header="I sent more EVER than I received stEVER">
                    <Text component="p">
                        {intl.formatMessage({
                            id: 'THE_PRICE_OF',
                        })}
                    </Text>
                    <Text component="p">
                        {intl.formatMessage({
                            id: 'AFTER_YOU_UMSTAKE',
                        })}
                    </Text>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
