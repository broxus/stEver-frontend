import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Link, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'

import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import { Direction, SystemTransactionColumn, SystemTransactionResponse } from '@/apiClientCodegen'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

import { StrategiesTransactionsStore } from '../store/strategiesTransactionsStore'

export function TabelStrategyTransactionsDashboardInner(): JSX.Element {

    const strategyTransactions = useStore(StrategiesTransactionsStore)

    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Transactions
            </Heading>
            <Observer>
                {() => (
                    <PanelLoader loading={strategyTransactions.isFetching}>
                        <Tile type="default" size="xsmall">
                            <table className="uk-table uk-table-divider uk-width-1-1 table">
                                <Media query={{ minWidth: 640 }}>
                                    <TransactionsListHeader strategyTransactions={strategyTransactions} />
                                </Media>
                                {strategyTransactions.transactions?.map((pool, idx) => (
                                    <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                        <TransactionsListItem
                                            key={pool.transactionHash}
                                            idx={idx + 1}
                                            pool={pool}
                                        />
                                    </Media>
                                ))}

                            </table>
                            <DepoolsListPagination strategyTransactions={strategyTransactions} />
                        </Tile>
                    </PanelLoader>
                )}
            </Observer>
        </Flex>
    )
}

type TransactionsListHeaderType = {
    strategyTransactions: StrategiesTransactionsStore
}

export function TransactionsListHeader({ strategyTransactions }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        strategyTransactions.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">Strategy</th>
                <th className="uk-text-left">Transaction</th>
                <th className="uk-text-left">Type</th>
                <th className="uk-text-left">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={SystemTransactionColumn.AMOUNT}
                                value={strategyTransactions.ordering.direction}
                                onSwitch={onSwitchOrdering}
                            >
                                Value, EVER
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
                <th className="uk-text-right">
                    Date & Time
                </th>
            </tr>
        </thead>
    )
}

type Props = {
    idx: number;
    pool: SystemTransactionResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {
    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link>{sliceAddress(pool.strategy)}</Link></td>
                <td className="uk-text-left"><Link>{sliceAddress(pool.transactionHash)}</Link></td>
                <td className="uk-text-left">{pool.kind}</td>
                <td className="uk-text-left">{pool.amount}</td>
                <td className="uk-text-right">{pool.transactionTime}</td>
            </tr>
        </tbody>
    )
}

type TransactionsListPaginationType = {
    strategyTransactions: StrategiesTransactionsStore
}

export function DepoolsListPagination({ strategyTransactions }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: strategyTransactions.pagination.currentPage + 1,
        })
    }

    const onPrevPage = async () => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: strategyTransactions.pagination.currentPage - 1,
        })
    }

    const onSubmitPage = async (value: number) => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <Pagination
                    currentPage={strategyTransactions.pagination.currentPage + 1}
                    totalPages={strategyTransactions.pagination.totalPages}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onSubmit={onSubmitPage}
                />
            )}
        </Observer>
    )
}

export const TabelStrategyTransactionsDashboard = observer(TabelStrategyTransactionsDashboardInner)
