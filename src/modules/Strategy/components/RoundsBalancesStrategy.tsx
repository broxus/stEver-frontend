import { Flex, Grid, Heading, Text, Tile, Width } from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../store/chartStore'
import { useStore } from '@/hooks/useStore'
import { FormattedTokenAmount } from '@broxus/react-components'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'


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
                            {dashboard.strategyRounds?.rounds.map((e, i) => {
                                if (dashboard.strategyRounds?.rounds.length === i + 1)
                                    return undefined
                                return (
                                    <Width size="1-3">
                                        <Tile type='default' size='xsmall'>
                                            <Text className="uk-margin-remove">Round {e[0]} </Text>
                                            <FormattedTokenAmount
                                                decimals={ST_EVER_DECIMALS}
                                                value={new BigNumber(e[1].stake).minus(e[1].validatorStake).toFixed()}
                                                symbol='EVER'
                                            />
                                        </Tile>
                                    </Width>
                                )
                            })}
                        </Grid>
                    )}
                </Observer>
            </Flex>
        </>
    )
}
export const RoundsBalancesStrategy = observer(RoundsBalancesStrategyInner)
