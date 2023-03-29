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
import { TabelUserTransactionsDashboard, TransactionUserListFilter } from '../components/TabelUserTransactionsDashboard'
import { TabelStrategyTransactionsDashboard, TransactionStrtegyListFilter } from '../components/TabelStrategyTransactionsDashboard'
import { TabelUserWithdrawDashboard } from '../components/TabelUserWithdrawDashboard'
import { TabelStrategyWithdrawDashboard } from '../components/TabelStrategyWithdrawDashboard'
import { StrategiesTransactionsStore } from '../store/strategiesTransactionsStore'
import { Flex, Heading, Tabs } from '@broxus/react-uikit'

export default function DashboardPage(): JSX.Element {

    const TabelDepoolsProvider = useProvider(TabelDepoolsStore)

    const UserTransactionsProvider = useProvider(UserTransactionsStore)
    const StrategiesTransactionsProvider = useProvider(StrategiesTransactionsStore)

    const UserWithdrawProvider = useProvider(UserWithdrawStore)
    const StrategyWithdrawProvider = useProvider(StrategyWithdrawStore)

    const ChartProvider = useProvider(ChartStore)

    const [state, setState] = React.useState("Users")

    const TabExtraContent = () => {
        if (state === "Strategies") {
            return (
                <TransactionStrtegyListFilter />
            )
        } else {
            return (
                <TransactionUserListFilter />
            )
        }
    }

    return (
        <div className="container container--large dashboard">
            <ChartProvider>
                <ChartDashboard />
            </ChartProvider>

            <TabelDepoolsProvider>
                <TabelDepoolsDashboard />
            </TabelDepoolsProvider>

            <Flex flexDirection="column" className="tabelTabs">
                <Heading component="h4">
                    Transactions
                </Heading>
                <UserTransactionsProvider>
                    <StrategiesTransactionsProvider>
                        <Tabs
                            defaultActiveKey="1"
                            id="tabs-withdraw"
                            onChange={(e) => {
                                setState(e)
                            }}
                            tabBarExtraContent={
                                {
                                    right: <TabExtraContent />
                                }
                            }
                            items={[
                                {
                                    label: 'Users',
                                    key: 'Users',
                                    children: <TabelUserTransactionsDashboard />
                                },
                                {
                                    label: 'Strategies',
                                    key: 'Strategies',
                                    children: <TabelStrategyTransactionsDashboard />

                                },
                            ]}
                        />
                    </StrategiesTransactionsProvider>
                </UserTransactionsProvider>
            </Flex>

            <Flex flexDirection="column" className="tabelTabs">
                <Heading component="h4">
                    Pendings withdraw
                </Heading>
                <Tabs
                    defaultActiveKey="1"
                    id="tabs-withdraw"
                    items={[
                        {
                            label: 'Users',
                            key: 'Users',
                            children: <UserWithdrawProvider>
                                <TabelUserWithdrawDashboard />
                            </UserWithdrawProvider>
                        },
                        {
                            label: 'Strategies',
                            key: 'Strategies',
                            children: <StrategyWithdrawProvider>
                                <TabelStrategyWithdrawDashboard />
                            </StrategyWithdrawProvider>
                        },
                    ]}
                />
            </Flex>


        </div>
    )
}
