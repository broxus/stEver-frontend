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

export function FaqStak(): JSX.Element {
    const staking = useStore(StakingStore)

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
                                        <Text className="uk-text-center uk-margin-remove">EVER staked</Text>
                                    </Tile>
                                    <Tile className="uk-padding-remove">
                                        <Text component="h4" className="uk-text-center uk-margin-remove">
                                            {staking?.isFetching ?
                                                <Placeholder height={30} width={100} />
                                                :
                                                <>{new BigNumber(staking?.strategyMainInfo?.apy ?? 0).times(100).toFixed(2)} %</>
                                            }
                                        </Text>
                                        <Text className="uk-text-center uk-margin-remove">Average APY</Text>
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
                                        <Text className="uk-text-center uk-margin-remove">Holders</Text>
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
                        Deposits are credited instantly and your money immediately begins to generate a profit. Withdrawals may take up to 36 hours. After a withdrawal, WEVER is credited to your account.
                    </Text>
                </Accordion.Item>
                <Accordion.Item header="I sent more EVER than I received stEVER">
                    <Text component="p">
                        The price of 1 EVER is less than 1 stEVER, so for 1 EVER you get less than 1 stEVER.
                    </Text>
                    <Text component="p">
                        After you unstake, you will get the opposite; more EVER than stEVER, because 1 stEVER is worth more than 1 EVER.
                    </Text>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
