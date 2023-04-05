import * as React from 'react'

import { ChartStrategy } from '@/modules/Strategy/components/ChartStrategy'
import { ChartStore } from '@/modules/Strategy/store/chartStore'
import { useProvider } from '@/hooks/useStore'

import './StrategyPage.scss'
import { StrategiesTransactionsStore } from '@/modules/Dashboard/store/strategiesTransactionsStore'
import { TabelStrategyTransactionsDashboard } from '@/modules/Dashboard/components/TabelStrategyTransactionsDashboard'
import { StrategyWithdrawStore } from '@/modules/Dashboard/store/strategyWithdrawStore'
import { TabelStrategyWithdrawDashboard } from '@/modules/Dashboard/components/TabelStrategyWithdrawDashboard'
import { RoundsBalancesStrategy } from '../components/RoundsBalancesStrategy'
import { Flex, Heading, Label } from '@broxus/react-uikit'
import { Placeholder } from '@/components/common/Placeholder'
import { Observer } from 'mobx-react-lite'

export default function StrategyPage(): JSX.Element {
    const ChartProvider = useProvider(ChartStore)
    const StrategiesTransactionsProvider = useProvider(StrategiesTransactionsStore)
    const StrategyWithdrawProvider = useProvider(StrategyWithdrawStore)

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
                                        Transactions
                                        {!strategyTransactions.isFetching ?
                                            <Label style={{ marginTop: "-5px" }} className="uk-margin-small-left">{strategyTransactions.pagination.totalCount}</Label>
                                            :
                                            <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                        }
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
                                        Pending withdrawals
                                        {!strategyWithdraw.isFetching ?
                                            <Label style={{ marginTop: "-5px" }} className="uk-margin-small-left">{strategyWithdraw.pagination.totalCount}</Label>
                                            :
                                            <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                        }
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
