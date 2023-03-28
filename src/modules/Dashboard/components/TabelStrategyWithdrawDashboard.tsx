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
import {
    StrategyWithdrawalResponse, Direction, StrategyWithdrawalColumn,
} from '@/apiClientCodegen'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { NavLink, generatePath } from 'react-router-dom'
import { appRoutes } from '@/routes'
import { ExplorerAccountLink, ExplorerTransactionLink } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'

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
        </Flex>
    )
}

type TransactionsListHeaderType = {
    strategyWithdraw: StrategyWithdrawStore
}

export function TransactionsListHeader({ strategyWithdraw }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        strategyWithdraw.setState('ordering', value)
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

    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left">
                    <NavLink to={generatePath(appRoutes.strategy.path, {
                        id: pool.strategy,
                    })}
                    >
                        {sliceAddress(pool.strategy)}
                    </NavLink>
                </td>
                <td className="uk-text-left">
                    <Link>
                        <ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            {sliceAddress(pool.transactionHash)}
                        </ExplorerTransactionLink>
                    </Link>
                </td>
                <td className="uk-text-left">{parseFloat(new BigNumber(pool.amount ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed())}</td>
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
