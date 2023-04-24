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
import {
    AccountIcon, ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount,
} from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { useIntl } from 'react-intl'

import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import {
    Direction, UserWithdrawalColumn, type UserWithdrawalResponse, type UserWithdrawalsOrdering, UsersWithdrawalsStatus,
} from '@/apiClientCodegen'
import { ST_EVER_DECIMALS } from '@/config'
import { Date } from '@/components/common/Date'
import { formatDate } from '@/utils'
import { DownloadCsv } from '@/components/common/DownloadCsv'

import { UserWithdrawStore } from '../store/userWithdrawStore'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'


function TabelUserWithdrawDashboardInner(): JSX.Element {
    const userWithdraw = useStore(UserWithdrawStore)
    const intl = useIntl()
    return (
        <Observer>
            {() => (
                <Tile type="default" className="uk-padding-remove">
                    {userWithdraw.isFetching
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
                                        <TransactionsListHeader userWithdraw={userWithdraw} />
                                    </Media>
                                    {userWithdraw.transactions?.map((pool, idx) => (
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
                                {!userWithdraw.transactions?.length
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
                    {userWithdraw.transactions?.length
                        ? <DepoolsListPagination userWithdraw={userWithdraw} />
                        : undefined}
                </Tile>
            )}
        </Observer>
    )
}

type TransactionsListHeaderType = {
    userWithdraw: UserWithdrawStore
}

export function TransactionsListHeader({ userWithdraw }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: UserWithdrawalsOrdering) => {
        userWithdraw.setState('ordering', value)
        userWithdraw.getTransactions({
            limit: userWithdraw.pagination.limit,
            offset: userWithdraw.pagination.currentPage * userWithdraw.pagination.limit,
            ordering: value,
            userAddress: null,
            statuses: userWithdraw.filter.length ? userWithdraw.filter : undefined,
            amountGe: undefined,
            amountLe: undefined,
        })
    }
    const intl = useIntl()

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'USER',
                    })}
                </th>
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
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={UserWithdrawalColumn.ST_AMOUNT}
                                value={{ column: userWithdraw.ordering.column, direction: userWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                {intl.formatMessage({
                                    id: 'VALUE_STEVER',
                                })}
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
                <th className="uk-text-right uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={UserWithdrawalColumn.CREATED_AT}
                                value={{ column: userWithdraw.ordering.column, direction: userWithdraw.ordering.direction }}
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
    pool: UserWithdrawalResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {

    const wallet = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>
                            {sliceAddress(pool.userAddress)}
                        </ExplorerAccountLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small"><Link><ExplorerTransactionLink subPath="transactions" baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>{sliceAddress(pool.transactionHash)}</ExplorerTransactionLink></Link></td>
                <td className="uk-text-left uk-width-small">
                    <Label
                        type={pool.status === UsersWithdrawalsStatus.DONE ? 'success'
                            : pool.status === UsersWithdrawalsStatus.PENDING ? 'warning' : undefined}
                    >
                        {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                    </Label>
                </td>
                <td className="uk-text-right uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.stAmount ?? 0}
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
    pool: UserWithdrawalResponse;
}

export function TransactionsListCard({ pool }: TransactionsListCardType): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()

    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap="xsmall">
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical" size="small">
                        <Link>
                            <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>
                                <Text className="uk-margin-auto-vertical" size="small">
                                    <AccountIcon className="uk-margin-small-right" size={20} address={pool.userAddress} />
                                    {sliceAddress(pool.userAddress)}
                                </Text>
                            </ExplorerAccountLink>
                        </Link>
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <Label
                            type={pool.status === UsersWithdrawalsStatus.DONE ? 'success'
                                : pool.status === UsersWithdrawalsStatus.PENDING ? 'warning' : undefined}
                        >
                            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                        </Label>
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'VALUE_STEVER',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.stAmount}
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
    userWithdraw: UserWithdrawStore
}
export function DepoolsListPagination({ userWithdraw }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        userWithdraw.setState('pagination', {
            ...userWithdraw.pagination,
            currentPage: userWithdraw.pagination.currentPage + 1,
        })
        userWithdraw.getTransactions({
            limit: userWithdraw.pagination.limit,
            offset: userWithdraw.pagination.currentPage * userWithdraw.pagination.limit,
            ordering: userWithdraw.ordering,
            userAddress: null,
            statuses: userWithdraw.filter.length ? userWithdraw.filter : undefined,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    const onPrevPage = async () => {
        userWithdraw.setState('pagination', {
            ...userWithdraw.pagination,
            currentPage: userWithdraw.pagination.currentPage - 1,
        })
        userWithdraw.getTransactions({
            limit: userWithdraw.pagination.limit,
            offset: userWithdraw.pagination.currentPage * userWithdraw.pagination.limit,
            ordering: userWithdraw.ordering,
            userAddress: null,
            statuses: userWithdraw.filter.length ? userWithdraw.filter : undefined,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    const onSubmitPage = async (value: number) => {
        userWithdraw.setState('pagination', {
            ...userWithdraw.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <Flex justifyContent="between" className="pagination-container">
                    <DownloadCsv
                        filename="PendingsWithdrawUser.csv"
                        keys={[
                            'userAddress',
                            'amount',
                            'nonce',
                            'stAmount',
                            'status',
                            'transactionHash',
                            'transactionTime',
                        ]}
                        items={userWithdraw?.transactions?.map(page => [
                            page.userAddress,
                            page.amount,
                            page.nonce,
                            page.stAmount,
                            page.status,
                            page.transactionHash,
                            formatDate((page.transactionTime || 0) * 1000), ,
                        ])}
                    />
                    <Pagination
                        currentPage={userWithdraw.pagination.currentPage + 1}
                        totalPages={userWithdraw.pagination.totalPages}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                        onSubmit={onSubmitPage}
                    />
                </Flex>
            )}
        </Observer>
    )
}


function WithdrawUserListFilterInner(): JSX.Element {

    const current = React.useRef<UsersWithdrawalsStatus[]>([])
    const userWithdraw = useStore(UserWithdrawStore)
    const intl = useIntl()

    const onChange = (e: UsersWithdrawalsStatus[]) => {
        current.current = e
        userWithdraw.setState('filter', e)

        userWithdraw.getTransactions({
            limit: userWithdraw.pagination.limit,
            offset: userWithdraw.pagination.currentPage * userWithdraw.pagination.limit,
            ordering: userWithdraw.ordering,
            userAddress: null,
            statuses: e.length ? e : undefined,
            amountGe: undefined,
            amountLe: undefined,
        }) 
    }

    const options = [
        {
            label: intl.formatMessage({
                id: 'WITHDRAWALS_DONE',
            }),
            value: UsersWithdrawalsStatus.DONE,
        },
        {
            label: intl.formatMessage({
                id: 'WITHDRAWALS_PENDING',
            }),
            value: UsersWithdrawalsStatus.PENDING,
        },
        {
            label: intl.formatMessage({
                id: 'WITHDRAWALS_CANCELLED',
            }),
            value: UsersWithdrawalsStatus.CANCELLED,
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

export const TabelUserWithdrawDashboard = observer(TabelUserWithdrawDashboardInner)
export const WithdrawUserListFilter = observer(WithdrawUserListFilterInner)
