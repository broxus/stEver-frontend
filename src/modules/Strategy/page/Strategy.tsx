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
import { Flex, Heading } from '@broxus/react-uikit'

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
                <Heading component="h4">
                    Transactions
                </Heading>
                <StrategiesTransactionsProvider>
                    <TabelStrategyTransactionsDashboard />
                </StrategiesTransactionsProvider>
            </Flex>

            <Flex flexDirection="column" className="tabelTabs">
                <Heading component="h4">
                    Pending withdrawals
                </Heading>
                <StrategyWithdrawProvider>
                    <TabelStrategyWithdrawDashboard />
                </StrategyWithdrawProvider>
            </Flex>
        </div>
    )
}
