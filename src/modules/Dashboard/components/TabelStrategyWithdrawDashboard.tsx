import * as React from 'react'
import Media from 'react-media'
import {
    Button,
    Checkbox,
    Drop,
    Flex, Grid, Label, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'
import { NavLink, generatePath, useParams } from 'react-router-dom'
import {
    AccountIcon, ExplorerTransactionLink, FormattedTokenAmount, Icon,
} from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { useIntl } from 'react-intl'

import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import {
    type StrategyWithdrawalResponse, Direction, StrategyWithdrawalColumn, StrategiesWithdrawalsStatus, type StrategyWithdrawalsOrdering,
} from '@/apiClientCodegen'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { ST_EVER_DECIMALS } from '@/config'
import { type Params, appRoutes } from '@/routes'
import { Date } from '@/components/common/Date'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { formatDate } from '@/utils'

import { StrategyWithdrawStore } from '../store/strategyWithdrawStore'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'


export function TabelStrategyWithdrawDashboardInner(): JSX.Element {
    const strategyWithdraw = useStore(StrategyWithdrawStore)
    const intl = useIntl()
    return (
        <Observer>
            {() => (
                <Tile type="default" className="uk-padding-remove">
                    {strategyWithdraw.isFetching
                        ? (
                            <Media query={{ minWidth: 640 }}>
                                {matches => (matches
                                    ? (<PoolsListPlaceholder />)
                                    : (<PoolsListMobilePlaceholder />))}
                            </Media>
                        )
                        : (
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
                                {!strategyWithdraw.transactions?.length
                                    && (
                                        <Tile className="empty-list">
                                            <Flex justifyContent="center">
                                                <Text className="uk-margin-auto-vertical">
                                                    {intl.formatMessage({
                                                        id: 'THE_LIST_IS_EMPTY',
                                                    })}
                                                </Text>
                                            </Flex>
                                        </Tile>
                                    )}
                            </>
                        )}
                    {strategyWithdraw.transactions?.length
                        ? <DepoolsListPagination strategyWithdraw={strategyWithdraw} />
                        : undefined}
                </Tile>
            )}
        </Observer>
    )
}

type TransactionsListHeaderType = {
    strategyWithdraw: StrategyWithdrawStore
}

export function TransactionsListHeader({ strategyWithdraw }: TransactionsListHeaderType): JSX.Element {
    const { id } = useParams<Params>()
    const intl = useIntl()
    const onSwitchOrdering = async (value: StrategyWithdrawalsOrdering) => {
        strategyWithdraw.setState('ordering', value)

        strategyWithdraw.getTransactions({
            limit: strategyWithdraw.pagination.limit,
            offset: strategyWithdraw.pagination.currentPage * strategyWithdraw.pagination.limit,
            ordering: value,
            // status: StrategiesWithdrawalsStatus.PENDING,
            strategy: id,
        })
    }

    return (
        <thead className="uk-height-small">
            <tr>
                {!id
                    && (
                        <th className="uk-text-left uk-width-small">
                            {intl.formatMessage({
                                id: 'STRATEGY',
                            })}
                        </th>
                    )}
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'TRANSACTION',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'STATUS',
                    })}
                </th>
                <th className="uk-text-right uk-width-small">
                    {intl.formatMessage({
                        id: 'VALUE_EVER',
                    })}
                </th>
                <th className="uk-text-right uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={StrategyWithdrawalColumn.CREATED_AT}
                                value={{ column: strategyWithdraw.ordering.column, direction: strategyWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                                positionLeft
                            >
                                {intl.formatMessage({
                                    id: 'DATE_TIME',
                                })}
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
    const { id } = useParams<Params>()

    return (
        <tbody className="uk-height-small">
            <tr>
                {!id
                    && (
                        <td className="uk-text-left uk-width-small">
                            <NavLink to={generatePath(appRoutes.strategy.path, {
                                id: pool.strategy,
                            })}
                            >
                                {sliceAddress(pool.strategy)}
                            </NavLink>
                        </td>
                    )}
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerTransactionLink subPath="transactions" baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                {sliceAddress(pool.transactionHash)}
                                <Icon
                                    className="uk-margin-auto-vertical uk-margin-small-left" ratio={0.6} type=""
                                    icon="externalLink"
                                />
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small">
                    <Label
                        type={pool.status === StrategiesWithdrawalsStatus.DONE ? 'success'
                            : pool.status === StrategiesWithdrawalsStatus.PENDING ? 'warning' : undefined}
                    >
                        {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                    </Label>
                </td>
                <td className="uk-text-right uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount}
                    />
                </td>
                <td className="uk-text-right uk-width-small">
                    <Flex flexDirection="column">
                        <Date time={pool.transactionTime * 1000} />
                    </Flex>
                </td>
            </tr>
        </tbody>
    )
}


type TransactionsListCardType = {
    idx: number;
    pool: StrategyWithdrawalResponse;
}

export function TransactionsListCard({ pool }: TransactionsListCardType): JSX.Element {
    const wallet = useTvmWalletContext()
    const { id } = useParams<Params>()
    const intl = useIntl()

    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap="xsmall">
                <Flex justifyContent="between">
                    {!id
                        && (
                            <Text className="uk-margin-auto-vertical" size="small">
                                <NavLink to={generatePath(appRoutes.strategy.path, {
                                    id: pool.strategy,
                                })}
                                >
                                    <AccountIcon className="uk-margin-small-right" size={20} address={pool.strategy} />
                                    {sliceAddress(pool.strategy)}
                                </NavLink>
                            </Text>
                        )}
                    <Text className="uk-margin-auto-vertical" size="small">
                        <Label
                            type={pool.status === StrategiesWithdrawalsStatus.DONE ? 'success'
                                : pool.status === StrategiesWithdrawalsStatus.PENDING ? 'warning' : undefined}
                        >
                            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                        </Label>
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'VALUE_EVER',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.amount}
                        />
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'TRANSACTION',
                        })}
                    </Text>

                    <Link>
                        <ExplorerTransactionLink subPath="transactions" baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                <Text className="uk-margin-auto-vertical" size="small">
                                    {sliceAddress(pool.transactionHash)}
                                </Text>
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'DATE_TIME',
                        })}
                    </Text>
                    <Link>
                        <Text className="uk-margin-auto-vertical" size="small">
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
            // status: StrategiesWithdrawalsStatus.PENDING,
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
            // status: StrategiesWithdrawalsStatus.PENDING,
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

function WithdrawStrategyListFilterInner(): JSX.Element {

    const current = React.useRef<StrategiesWithdrawalsStatus[]>([])
    const strategyWithdraw = useStore(StrategyWithdrawStore)
    const intl = useIntl()

    const onChange = (e: StrategiesWithdrawalsStatus[]) => {
        current.current = e
        strategyWithdraw.setState('filter', e)

        strategyWithdraw.getTransactions({
            limit: strategyWithdraw.pagination.limit,
            offset: strategyWithdraw.pagination.currentPage * strategyWithdraw.pagination.limit,
            ordering: strategyWithdraw.ordering,
            userAddress: null,
            status: e,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    const options = [
        {
            label: intl.formatMessage({
                id: 'DONE',
            }),
            value: StrategiesWithdrawalsStatus.DONE,
        },
        {
            label: intl.formatMessage({
                id: 'PENDING',
            }),
            value: StrategiesWithdrawalsStatus.PENDING,
        },
        {
            label: intl.formatMessage({
                id: 'ERROR',
            }),
            value: StrategiesWithdrawalsStatus.ERROR,
        },
    ]
    return (
        <Drop
            trigger={['hover']}
            placement="bottom-right"
            overlay={(
                <Tile type="default" size="xsmall">
                    <Text component="h6">
                        {intl.formatMessage({
                            id: 'TYPE',
                        })}
                    </Text>
                    <Checkbox.Group
                        options={options}
                        onChange={onChange}
                        stack
                    />
                </Tile>
            )}
        >
            <Button type="secondary">
                {intl.formatMessage({
                    id: 'TYPE',
                })}
            </Button>
        </Drop>
    )
}


export const TabelStrategyWithdrawDashboard = observer(TabelStrategyWithdrawDashboardInner)
export const WithdrawStrategyListFilter = observer(WithdrawStrategyListFilterInner)
