import * as React from 'react'
import Media from 'react-media'
import {
    Button,
    Checkbox,
    Drop,
    Flex, Grid, Heading, Label, Link, Tabs, Text, Tile,
} from '@broxus/react-uikit'

import { Pagination } from '@/components/common/Pagination'

import { Observer, observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'
import { sliceAddress } from '@broxus/js-utils'
import { PanelLoader } from '@/components/common/PanelLoader'
import { StrategyWithdrawalResponse, SystemTransactionResponse, Direction, StrategyWithdrawalColumn } from '@/apiClientCodegen'
import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

export function TabelStrategyWithdrawDashboardInner(): JSX.Element {

    const strategyWithdraw = useStore(StrategyWithdrawStore)

    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Pendings withdraw
            </Heading>
            <Observer>
                {() => (
                    <PanelLoader loading={strategyWithdraw.isFetching}>
                        <Tile type="default" size="xsmall">
                            <table className="uk-table uk-table-divider uk-width-1-1 table">
                                <Media query={{ minWidth: 640 }}>
                                    <TransactionsListHeader strategyWithdraw={strategyWithdraw} />
                                </Media>
                                {strategyWithdraw.transactions?.map((pool, idx) => (
                                    <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                        <TransactionsListItem
                                            key={pool.transactionHash}
                                            idx={idx + 1}
                                            pool={pool}
                                        />
                                    </Media>
                                ))}

                            </table>
                            <DepoolsListPagination strategyWithdraw={strategyWithdraw} />
                        </Tile>
                    </PanelLoader>
                )}
            </Observer>
        </Flex >
    )
}

type TransactionsListHeaderType = {
    strategyWithdraw: StrategyWithdrawStore
}

export function TransactionsListHeader({ strategyWithdraw }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        strategyWithdraw.setState("ordering", value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">Strategy</th>
                <th className="uk-text-left">Transaction</th>
                <th className="uk-text-left">Value, EVER</th>
                <th className="uk-text-right">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={StrategyWithdrawalColumn.CREATED_AT}
                                value={strategyWithdraw.ordering.direction}
                                onSwitch={onSwitchOrdering}
                            >
                                Date & Time
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
            </tr>
        </thead>
    )
}

type Props = {
    idx: number;
    pool: StrategyWithdrawalResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {
    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link>{sliceAddress(pool.strategy)}</Link></td>
                <td className="uk-text-left"><Link>{sliceAddress(pool.transactionHash)}</Link></td>
                <td className="uk-text-left">{pool.amount}</td>
                <td className="uk-text-right">{pool.transactionTime}</td>
            </tr>
        </tbody>
    )
}

type TransactionsListPaginationType = {
    strategyWithdraw: StrategyWithdrawStore
}

export function DepoolsListPagination({ strategyWithdraw }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        strategyWithdraw.setState('pagination', {
            ...strategyWithdraw.pagination,
            currentPage: strategyWithdraw.pagination.currentPage + 1,
        })
    }

    const onPrevPage = async () => {
        strategyWithdraw.setState('pagination', {
            ...strategyWithdraw.pagination,
            currentPage: strategyWithdraw.pagination.currentPage - 1,
        })
    }

    const onSubmitPage = async (value: number) => {
        strategyWithdraw.setState('pagination', {
            ...strategyWithdraw.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <Pagination
                    currentPage={strategyWithdraw.pagination.currentPage + 1}
                    totalPages={strategyWithdraw.pagination.totalPages}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onSubmit={onSubmitPage}
                />
            )}
        </Observer>
    )
}

export const TabelStrategyWithdrawDashboard = observer(TabelStrategyWithdrawDashboardInner)
