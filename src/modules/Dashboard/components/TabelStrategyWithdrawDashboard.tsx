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
import { ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { Date } from '@/components/common/Date'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { formatDate } from '@/utils'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'

export function TabelStrategyWithdrawDashboardInner(): JSX.Element {

    const strategyWithdraw = useStore(StrategyWithdrawStore)

    return (
        <Observer>
            {() => (
                <PanelLoader loading={strategyWithdraw.isFetching}>
                    <Tile type="default" className="uk-padding-remove">
                        {strategyWithdraw.isFetching ?
                            <PoolsListPlaceholder />
                            :
                            <>
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
                            </>
                        }
                        <DepoolsListPagination strategyWithdraw={strategyWithdraw} />
                    </Tile>
                </PanelLoader>
            )}
        </Observer>
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
                <th className="uk-text-left uk-width-small">Strategy</th>
                <th className="uk-text-left uk-width-small">Transaction</th>
                <th className="uk-text-left uk-width-small">Value, EVER</th>
                <th className="uk-text-right uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={StrategyWithdrawalColumn.CREATED_AT}
                                value={{ column: strategyWithdraw.ordering.column, direction: strategyWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                                positionLeft={true}
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
                <td className="uk-text-left uk-width-small">
                    <NavLink to={generatePath(appRoutes.strategy.path, {
                        id: pool.strategy,
                    })}
                    >
                        {sliceAddress(pool.strategy)}
                    </NavLink>
                </td>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                {sliceAddress(pool.transactionHash)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} type='' icon='externalLink' />
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount}
                    />
                </td>
                <td className="uk-text-right uk-width-small">
                    <Flex flexDirection='column'>
                        <Date time={pool.transactionTime * 1000} />
                    </Flex>
                </td>
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
                <Flex justifyContent="between" className="pagination-container">
                    <DownloadCsv
                        filename="PendingsWithdrawStrategy.csv"
                        keys={[
                            'amount',
                            'round',
                            'status',
                            'strategy',
                            'transactionHash',
                            'transactionTime',
                        ]}
                        items={strategyWithdraw?.transactions?.map(page => [
                            page.amount,
                            page.round,
                            page.status,
                            page.strategy,
                            page.transactionHash,
                            formatDate((page.transactionTime || 0) * 1000), ,
                        ])}
                    />
                    <Pagination
                        currentPage={strategyWithdraw.pagination.currentPage + 1}
                        totalPages={strategyWithdraw.pagination.totalPages}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                        onSubmit={onSubmitPage}
                    />
                </Flex>
            )}
        </Observer>
    )
}

export const TabelStrategyWithdrawDashboard = observer(TabelStrategyWithdrawDashboardInner)
