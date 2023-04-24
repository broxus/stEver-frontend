import {
    Flex, Grid, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { FormattedTokenAmount } from '@broxus/react-components'
import BigNumber from 'bignumber.js'
import { useIntl } from 'react-intl'
import Media from 'react-media'

import { useStore } from '@/hooks/useStore'
import { ST_EVER_DECIMALS } from '@/config'


import './RoundsBalancesStrategy.scss'
import { Placeholder } from '@/components/common/Placeholder'
import { RateChange } from '@/components/common/RateChange'


import { ChartStore } from '../store/chartStore'

function RoundsBalancesStrategyInner(): JSX.Element {
    const dashboard = useStore(ChartStore)
    const intl = useIntl()
    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                {intl.formatMessage({
                    id: 'ROUNDS_BALANCES',
                })}
            </Heading>

            <Media query={{ minWidth: 640 }}>
                {matches => (
                    <Observer>
                        {() => (
                            <Grid gap="xsmall" match>
                                {dashboard.strategyRounds
                                    ? dashboard.strategyRounds.rounds.map((e, i) => {
                                        if (dashboard.strategyRounds?.rounds.length === i + 1) return undefined
                                        return (
                                            <Width size={matches ? '1-3' : '1-1'}>
                                                <Tile type="secondary" size="xsmall" className="round">
                                                    <Text className="uk-margin-remove">
                                                        Round
                                                        {e[0]}
                                                    </Text>
                                                    <Flex>
                                                        {dashboard.strategyMainInfo?.tvlDeltaNextRound
                                                                && i === 2
                                                            ? (
                                                                <>
                                                                    <FormattedTokenAmount
                                                                        decimals={ST_EVER_DECIMALS}
                                                                        value={new BigNumber(dashboard.strategyMainInfo?.tvlDeltaNextRound ?? 0).plus(e[1].stake).plus(dashboard.strategyRounds?.rounds[0][1].stake ?? 0).toFixed()}
                                                                        symbol="EVER"
                                                                    />
                                                                    <div className="round__rateChange">
                                                                        <RateChange
                                                                            size="sm" currency="" className="uk-margin-small-left"
                                                                            value={
                                                                                new BigNumber(dashboard.strategyMainInfo?.tvlDeltaNextRound ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed()
                                                                            }
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                            : (
                                                                <FormattedTokenAmount
                                                                    decimals={ST_EVER_DECIMALS}
                                                                    value={new BigNumber(e[1].stake).minus(e[1].validatorStake).toFixed()}
                                                                    symbol="EVER"
                                                                />
                                                            )}
                                                    </Flex>
                                                </Tile>
                                            </Width>
                                        )
                                    })
                                    : (
                                        <>
                                            <Width size={matches ? '1-3' : '1-1'}>
                                                <Tile type="secondary" size="xsmall" className="round">
                                                    <Text className="uk-margin-remove">
                                                        <Placeholder height={16} width={100} />
                                                    </Text>
                                                    <Placeholder height={26} width={150} />
                                                </Tile>
                                            </Width>
                                            <Width size={matches ? '1-3' : '1-1'}>
                                                <Tile type="secondary" size="xsmall" className="round">
                                                    <Text className="uk-margin-remove">
                                                        <Placeholder height={16} width={100} />
                                                    </Text>
                                                    <Placeholder height={26} width={150} />
                                                </Tile>
                                            </Width>
                                            <Width size={matches ? '1-3' : '1-1'}>
                                                <Tile type="secondary" size="xsmall" className="round">
                                                    <Text className="uk-margin-remove">
                                                        <Placeholder height={16} width={100} />
                                                    </Text>
                                                    <Placeholder height={26} width={150} />
                                                </Tile>
                                            </Width>
                                        </>
                                    )}
                            </Grid>
                        )}
                    </Observer>
                )}

            </Media>

        </Flex>
    )
}
export const RoundsBalancesStrategy = observer(RoundsBalancesStrategyInner)
