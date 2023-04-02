import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Grid, Heading, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'

import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import {
    StrategyWithdrawalResponse, Direction, StrategyWithdrawalColumn, StrategiesWithdrawalsStatus,
} from '@/apiClientCodegen'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { NavLink, generatePath, useParams } from 'react-router-dom'
import { Params, appRoutes } from '@/routes'
import { AccountIcon, ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
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
                                            {matches => (matches ? (
                                                <TransactionsListItem
                                                    key={pool.transactionHash}
                                                    idx={idx + 1}
                                                    pool={pool}
                                                />
                                            ) : (
                                                <TransactionsListCard
                                                    key={pool.transactionHash}
                                                    idx={idx + 1}
                                                    pool={pool}
                                                />
                                            ))}
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
    const { id } = useParams<Params>()

    const onSwitchOrdering = async (value: any) => {
        strategyWithdraw.setState('ordering', value)

        strategyWithdraw.getTransactions({
            limit: strategyWithdraw.pagination.limit,
            offset: strategyWithdraw.pagination.currentPage * strategyWithdraw.pagination.limit,
            ordering: value,
            status: StrategiesWithdrawalsStatus.PENDING,
            strategy: id,
        })
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

    const wallet = useTvmWalletContext()

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


type TransactionsListCardType = {
    idx: number;
    pool: any;
}

export function TransactionsListCard({ pool }: TransactionsListCardType): JSX.Element {
    const wallet = useTvmWalletContext()

    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap='xsmall'>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical' size='small'>
                        <NavLink to={generatePath(appRoutes.strategy.path, {
                            id: pool.strategy,
                        })}
                        >
                            <AccountIcon className='uk-margin-small-right' size={20} address={pool.strategy} />
                            {sliceAddress(pool.strategy)}
                        </NavLink>
                    </Text>
                    <Text className='uk-margin-auto-vertical' size='small'>
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.stAmount}
                        />
                    </Text>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>Transaction</Text>

                    <Link>
                        <ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                <Text className='uk-margin-auto-vertical' size='small'>
                                    {sliceAddress(pool.transactionHash)}
                                </Text>
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>Date & Time</Text>
                    <Link>
                        <Text className='uk-margin-auto-vertical' size='small'>
                            <Date line time={pool.transactionTime * 1000} />
                        </Text>
                    </Link>
                </Flex>
            </Grid>
        </Tile>
    )
}

type TransactionsListPaginationType = {
    strategyWithdraw: StrategyWithdrawStore
}

export function DepoolsListPagination({ strategyWithdraw }: TransactionsListPaginationType): JSX.Element {

    const { id } = useParams<Params>()

    const onNextPage = async () => {
        strategyWithdraw.setState('pagination', {
            ...strategyWithdraw.pagination,
            currentPage: strategyWithdraw.pagination.currentPage + 1,
        })
        strategyWithdraw.getTransactions({
            limit: strategyWithdraw.pagination.limit,
            offset: strategyWithdraw.pagination.currentPage * strategyWithdraw.pagination.limit,
            ordering: strategyWithdraw.ordering,
            status: StrategiesWithdrawalsStatus.PENDING,
            strategy: id,
        })
    }

    const onPrevPage = async () => {
        strategyWithdraw.setState('pagination', {
            ...strategyWithdraw.pagination,
            currentPage: strategyWithdraw.pagination.currentPage - 1,
        })
        strategyWithdraw.getTransactions({
            limit: strategyWithdraw.pagination.limit,
            offset: strategyWithdraw.pagination.currentPage * strategyWithdraw.pagination.limit,
            ordering: strategyWithdraw.ordering,
            status: StrategiesWithdrawalsStatus.PENDING,
            strategy: id,
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
