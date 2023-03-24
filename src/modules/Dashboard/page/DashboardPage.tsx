import * as React from 'react'

import { useProvider } from '@/hooks/useStore'
import './DashboardPage.scss'

import { TabelDepoolsStore } from '../store/depoolsStore'
import { UserTransactionsStore } from '../store/userTransactionsStore'
import { UserWithdrawStore } from '../store/userWithdrawStore'
import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import { ChartStore } from '../store/chartStore'
import { ChartDashboard } from '../components/ChartDashboard'
import { TabelDepoolsDashboard } from '../components/TabelDepoolsDashboard'
import { TabelUserTransactionsDashboard } from '../components/TabelUserTransactionsDashboard'
import { TabelStrategyTransactionsDashboard } from '../components/TabelStrategyTransactionsDashboard'
import { TabelUserWithdrawDashboard } from '../components/TabelUserWithdrawDashboard'
import { TabelStrategyWithdrawDashboard } from '../components/TabelStrategyWithdrawDashboard'
import { StrategiesTransactionsStore } from '../store/strategiesTransactionsStore'

export default function DashboardPage(): JSX.Element {
    const TabelDepoolsProvider = useProvider(TabelDepoolsStore)

    const UserTransactionsProvider = useProvider(UserTransactionsStore)
    const StrategiesTransactionsProvider = useProvider(StrategiesTransactionsStore)

    const UserWithdrawProvider = useProvider(UserWithdrawStore)
    const StrategyWithdrawProvider = useProvider(StrategyWithdrawStore)

    const ChartProvider = useProvider(ChartStore)


    return (
        <div className="container container--large dashboard">
            <ChartProvider>
                <ChartDashboard />
            </ChartProvider>

            <TabelDepoolsProvider>
                <TabelDepoolsDashboard />
            </TabelDepoolsProvider>

            <UserTransactionsProvider>
                <TabelUserTransactionsDashboard />
            </UserTransactionsProvider>

            <StrategiesTransactionsProvider>
                <TabelStrategyTransactionsDashboard />
            </StrategiesTransactionsProvider>

            <UserWithdrawProvider>
                <TabelUserWithdrawDashboard />
            </UserWithdrawProvider>

            <StrategyWithdrawProvider>
                <TabelStrategyWithdrawDashboard />
            </StrategyWithdrawProvider>
        </div>
    )
}
