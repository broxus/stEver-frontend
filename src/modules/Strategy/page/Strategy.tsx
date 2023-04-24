import * as React from 'react'

import { ChartStrategy } from '@/modules/Strategy/components/ChartStrategy'
import { ChartStore } from '@/modules/Strategy/store/chartStore'
import { useProvider } from '@/hooks/useStore'

import './StrategyPage.scss'
import { StrategiesTransactionsStore } from '@/modules/Dashboard/store/strategiesTransactionsStore'
import { TabelStrategyTransactionsDashboard } from '@/modules/Dashboard/components/TabelStrategyTransactionsDashboard'
import { StrategyWithdrawStore } from '@/modules/Dashboard/store/strategyWithdrawStore'
import { TabelStrategyWithdrawDashboard } from '@/modules/Dashboard/components/TabelStrategyWithdrawDashboard'
import { Placeholder } from '@/components/common/Placeholder'

import { RoundsBalancesStrategy } from '../components/RoundsBalancesStrategy'

import { Flex, Heading, Label } from '@broxus/react-uikit'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

export default function StrategyPage(): JSX.Element {
    const ChartProvider = useProvider(ChartStore)
    const StrategiesTransactionsProvider = useProvider(StrategiesTransactionsStore)
    const StrategyWithdrawProvider = useProvider(StrategyWithdrawStore)
    const intl = useIntl()
    return (
        <div className="container container--large dashboard">
            <ChartProvider>
                <ChartStrategy />
                <RoundsBalancesStrategy />
            </ChartProvider>

            <Flex flexDirection="column" className="tabelTabs">
                <StrategiesTransactionsProvider>
                    {strategyTransactions => (
                        <Observer>
                            {() => (
                                <>
                                    <Heading component="h4">
                                        {intl.formatMessage({
                                            id: 'TRANSACTIONS',
                                        })}
                                        {!strategyTransactions.isFetching
                                            ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{strategyTransactions.pagination.totalCount}</Label>
                                            : <Placeholder className="uk-margin-small-left" height={24} width={31} />}
                                    </Heading>
                                    <TabelStrategyTransactionsDashboard />
                                </>
                            )}
                        </Observer>

                    )}

                </StrategiesTransactionsProvider>
            </Flex>

            <Flex flexDirection="column" className="tabelTabs">
                <StrategyWithdrawProvider>
                    {strategyWithdraw => (
                        <Observer>
                            {() => (
                                <>
                                    <Heading component="h4">
                                        {intl.formatMessage({
                                            id: 'PENDING_WITHDRAWALS',
                                        })}
                                        {!strategyWithdraw.isFetching
                                            ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{strategyWithdraw.pagination.totalCount}</Label>
                                            : <Placeholder className="uk-margin-small-left" height={24} width={31} />}
                                    </Heading>
                                    <TabelStrategyWithdrawDashboard />
                                </>
                            )}
                        </Observer>
                    )}

                </StrategyWithdrawProvider>
            </Flex>
        </div>
    )
}
