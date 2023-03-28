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
            <StrategiesTransactionsProvider>
                <TabelStrategyTransactionsDashboard />
            </StrategiesTransactionsProvider>
            <StrategyWithdrawProvider>
                <TabelStrategyWithdrawDashboard />
            </StrategyWithdrawProvider>
        </div>
    )
}
