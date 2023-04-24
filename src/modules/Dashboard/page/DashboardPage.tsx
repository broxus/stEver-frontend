import * as React from 'react'

import { useProvider } from '@/hooks/useStore'
import './DashboardPage.scss'

import { Placeholder } from '@/components/common/Placeholder'
import { useTvmWallet } from '@/utils'

import { TabelDepoolsStore } from '../store/depoolsStore'
import { UserTransactionsStore } from '../store/userTransactionsStore'
import { UserWithdrawStore } from '../store/userWithdrawStore'
import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import { ChartStore } from '../store/chartStore'
import { ChartDashboard } from '../components/ChartDashboard'
import { TabelDepoolsDashboard } from '../components/TabelDepoolsDashboard'
import { TabelUserTransactionsDashboard, TransactionUserListFilter } from '../components/TabelUserTransactionsDashboard'
import { TabelStrategyTransactionsDashboard, TransactionStrtegyListFilter } from '../components/TabelStrategyTransactionsDashboard'
import { TabelUserWithdrawDashboard, WithdrawUserListFilter } from '../components/TabelUserWithdrawDashboard'
import { TabelStrategyWithdrawDashboard, WithdrawStrategyListFilter } from '../components/TabelStrategyWithdrawDashboard'
import { StrategiesTransactionsStore } from '../store/strategiesTransactionsStore'

import {
    Flex, Heading, Label, Tabs,
} from '@broxus/react-uikit'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { MyWithdrawStore } from '../store/myWithdrawStore'
import { TabelMyWithdraw } from '../components/TabelMyWithdraw'


export default function DashboardPage(): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWallet()

    const TabelDepoolsProvider = useProvider(TabelDepoolsStore)

    const UserTransactionsProvider = useProvider(UserTransactionsStore)
    const StrategiesTransactionsProvider = useProvider(StrategiesTransactionsStore)

    const UserWithdrawProvider = useProvider(UserWithdrawStore)
    const StrategyWithdrawProvider = useProvider(StrategyWithdrawStore)

    const ChartProvider = useProvider(ChartStore)

    const MyWithdrawProvider = useProvider(MyWithdrawStore, wallet)


    const [stateTransactionTransactions, setStateTransactionTransactions] = React.useState('Users')
    const [stateTransactionWithdraw, setStateTransactionWithdraw] = React.useState('Users')

    function TabExtraContentTransactions() {
        if (stateTransactionTransactions === 'Users') {
            return (
                <TransactionUserListFilter />
            )
        }
        return (
            <TransactionStrtegyListFilter />
        )

    }

    function TabExtraContentWithdraw() {
        if (stateTransactionWithdraw === 'Users') {
            return (
                <WithdrawUserListFilter />
            )
        }
        return (
            <WithdrawStrategyListFilter />
        )

    }

    return (
        <div className="container container--large dashboard">
            <ChartProvider>
                <ChartDashboard />
            </ChartProvider>

            <MyWithdrawProvider>
                <TabelMyWithdraw />
            </MyWithdrawProvider>

            <TabelDepoolsProvider>
                <TabelDepoolsDashboard />
            </TabelDepoolsProvider>

            <Flex flexDirection="column" className="tabelTabs">
                <UserTransactionsProvider>
                    {userTransactions => (
                        <StrategiesTransactionsProvider>
                            {strategyTransactions => (
                                <Observer>
                                    {() => (
                                        <>
                                            <Heading component="h4">
                                                {intl.formatMessage({
                                                    id: 'TRANSACTIONS',
                                                })}
                                                {stateTransactionTransactions === 'Users'
                                                    ? (
                                                        !userTransactions.isFetching
                                                            ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{userTransactions.pagination.totalCount}</Label>
                                                            : <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                                    )
                                                    : (
                                                        !strategyTransactions.isFetching
                                                            ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{strategyTransactions.pagination.totalCount}</Label>
                                                            : <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                                    )}
                                            </Heading>
                                            <Tabs
                                                defaultActiveKey="1"
                                                id="tabs-withdraw"
                                                onChange={e => {
                                                    setStateTransactionTransactions(e)
                                                }}
                                                tabBarExtraContent={
                                                    {
                                                        right: <TabExtraContentTransactions />,
                                                    }
                                                }
                                                items={[
                                                    {
                                                        label: intl.formatMessage({
                                                            id: 'USERS',
                                                        }),
                                                        key: 'Users',
                                                        children: <TabelUserTransactionsDashboard />,
                                                    },
                                                    {
                                                        label: intl.formatMessage({
                                                            id: 'STRATEGIES',
                                                        }),
                                                        key: 'Strategies',
                                                        children: <TabelStrategyTransactionsDashboard />,
                                                    },
                                                ]}
                                            />
                                        </>
                                    )}
                                </Observer>
                            )}
                        </StrategiesTransactionsProvider>
                    )}
                </UserTransactionsProvider>
            </Flex>
            <UserWithdrawProvider>
                {userWithdraw => (
                    <StrategyWithdrawProvider>
                        {strategyWithdraw => (
                            <Observer>
                                {() => (
                                    <Flex flexDirection="column" className="tabelTabs">
                                        <Heading component="h4">
                                            {intl.formatMessage({
                                                id: 'WITHDRAWALS',
                                            })}
                                            {stateTransactionWithdraw === 'Users'
                                                ? (
                                                    !userWithdraw.isFetching
                                                        ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{userWithdraw.pagination.totalCount}</Label>
                                                        : <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                                )
                                                : (
                                                    !strategyWithdraw.isFetching
                                                        ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{strategyWithdraw.pagination.totalCount}</Label>
                                                        : <Placeholder className="uk-margin-small-left" height={24} width={31} />
                                                )}
                                        </Heading>
                                        <Tabs
                                            defaultActiveKey="1"
                                            id="tabs-withdraw"
                                            onChange={e => {
                                                setStateTransactionWithdraw(e)
                                            }}
                                            tabBarExtraContent={
                                                {
                                                    right: <TabExtraContentWithdraw />,
                                                }
                                            }
                                            items={[
                                                {
                                                    label: intl.formatMessage({
                                                        id: 'USERS',
                                                    }),
                                                    key: 'Users',
                                                    children: <TabelUserWithdrawDashboard />,

                                                },
                                                {
                                                    label: intl.formatMessage({
                                                        id: 'STRATEGIES',
                                                    }),
                                                    key: 'Strategies',
                                                    children: <TabelStrategyWithdrawDashboard />,

                                                },
                                            ]}
                                        />
                                    </Flex>
                                )}
                            </Observer>
                        )}
                    </StrategyWithdrawProvider>
                )}
            </UserWithdrawProvider>
        </div>
    )
}
