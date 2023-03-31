import { Flex, Grid, Heading, Text, Tile, Width } from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../store/chartStore'
import { useStore } from '@/hooks/useStore'
import { FormattedTokenAmount } from '@broxus/react-components'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'
import "./RoundsBalancesStrategy.scss"
import { Placeholder } from '@/components/common/Placeholder'

function RoundsBalancesStrategyInner(): JSX.Element {
    const dashboard = useStore(ChartStore)
    return (
        <>
            <Flex flexDirection="column">
                <Heading component="h4">
                    Rounds balances
                </Heading>
                <Observer>
                    {() => (
                        <Grid gap="xsmall" match>
                            {dashboard.strategyRounds ?

                                dashboard.strategyRounds.rounds.map((e, i) => {
                                    if (dashboard.strategyRounds?.rounds.length === i + 1)
                                        return undefined
                                    return (
                                        <Width size="1-3">
                                            <Tile type='secondary' size='xsmall' className="round">
                                                <Text className="uk-margin-remove">Round {e[0]} </Text>
                                                <FormattedTokenAmount
                                                    decimals={ST_EVER_DECIMALS}
                                                    value={new BigNumber(e[1].stake).minus(e[1].validatorStake).toFixed()}
                                                    symbol='EVER'
                                                />
                                            </Tile>
                                        </Width>
                                    )
                                })
                                :
                                <>
                                    <Width size="1-3">
                                        <Tile type='secondary' size='xsmall' className="round">
                                            <Text className="uk-margin-remove">
                                                <Placeholder height={20} width={100} />
                                            </Text>
                                            <Placeholder height={30} width={150} />
                                        </Tile>
                                    </Width>
                                    <Width size="1-3">
                                        <Tile type='secondary' size='xsmall' className="round">
                                            <Text className="uk-margin-remove">
                                                <Placeholder height={20} width={100} />
                                            </Text>
                                            <Placeholder height={30} width={150} />
                                        </Tile>
                                    </Width>
                                    <Width size="1-3">
                                        <Tile type='secondary' size='xsmall' className="round">
                                            <Text className="uk-margin-remove">
                                                <Placeholder height={20} width={100} />
                                            </Text>
                                            <Placeholder height={30} width={150} />
                                        </Tile>
                                    </Width>
                                </>
                            }
                        </Grid>
                    )}
                </Observer>
            </Flex>
        </>
    )
}
export const RoundsBalancesStrategy = observer(RoundsBalancesStrategyInner)
