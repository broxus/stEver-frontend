import * as React from 'react'
import Media from 'react-media'
import {
    Button,
    Checkbox,
    Drop,
    Flex, Grid, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'
import {
    AccountIcon, ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount, Icon,
} from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { useIntl } from 'react-intl'

import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import {
    Direction, UserTransactionColumn, type UserTransactionResponse, UserTransactionsKind, type UserTransactionsOrdering,
} from '@/apiClientCodegen'
import { ST_EVER_DECIMALS } from '@/config'
import { Date } from '@/components/common/Date'
import { formatDate } from '@/utils'
import { DownloadCsv } from '@/components/common/DownloadCsv'

import { UserTransactionsStore } from '../store/userTransactionsStore'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'


function TabelUserTransactionsDashboardInner(): JSX.Element {
    const userTransactions = useStore(UserTransactionsStore)
    const intl = useIntl()
    return (
        <Observer>
            {() => (
                <Tile type="default" className="uk-padding-remove">
                    {userTransactions.isFetching
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
                                        <TransactionsListHeader userTransactions={userTransactions} />
                                    </Media>
                                    {userTransactions.transactions?.map((pool, idx) => (
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
                                {!userTransactions.transactions?.length
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
                    {userTransactions.transactions?.length
                        ? <DepoolsListPagination userTransactions={userTransactions} />
                        : undefined}
                </Tile>
            )}
        </Observer>
    )
}

type TransactionsListHeaderType = {
    userTransactions: UserTransactionsStore
}

export function TransactionsListHeader({ userTransactions }: TransactionsListHeaderType): JSX.Element {
    const onSwitchOrdering = async (value: UserTransactionsOrdering) => {
        userTransactions.setState('ordering', value)
        userTransactions.getTransactions({
            from: null,
            kind: userTransactions.filter.length === 2 ? undefined : userTransactions.filter[0],
            limit: userTransactions.pagination.limit,
            offset: userTransactions.pagination.currentPage * userTransactions.pagination.limit,
            ordering: value,
            to: null,
            userAddress: null,
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
                        id: 'TYPE',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={UserTransactionColumn.AMOUNT}
                                value={{ column: userTransactions.ordering.column, direction: userTransactions.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                {intl.formatMessage({
                                    id: 'VALUE_EVER',
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
                                column={UserTransactionColumn.CREATED_AT}
                                value={{ column: userTransactions.ordering.column, direction: userTransactions.ordering.direction }}
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
    pool: UserTransactionResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>
                            <Flex>
                                {sliceAddress(pool.userAddress)}
                                <Icon
                                    className="uk-margin-auto-vertical uk-margin-small-left" ratio={0.6} type=""
                                    icon="externalLink"
                                />
                            </Flex>
                        </ExplorerAccountLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerTransactionLink baseUrl={wallet.network?.explorer.baseUrl} subPath="transactions" txHash={pool.transactionHash}>
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
                <td className="uk-text-left uk-width-small">{
                    pool.kind === UserTransactionsKind.DEPOSIT ?
                        intl.formatMessage({
                            id: 'DEPOSIT',
                        })
                        :
                        intl.formatMessage({
                            id: 'WITHDRAWAL',
                        })}
                </td>
                <td className="uk-text-left uk-width-small">
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
    pool: UserTransactionResponse;
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
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.amount}
                        />
                        {' EVER'}
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">Transaction</Text>

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
                            id: 'TYPE',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        {pool.kind === UserTransactionsKind.DEPOSIT ?
                            intl.formatMessage({
                                id: 'DEPOSIT',
                            })
                            :
                            intl.formatMessage({
                                id: 'WITHDRAWAL',
                            })}
                    </Text>
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
    userTransactions: UserTransactionsStore
}
export function DepoolsListPagination({ userTransactions }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        userTransactions.setState('pagination', {
            ...userTransactions.pagination,
            currentPage: userTransactions.pagination.currentPage + 1,
        })
        userTransactions.getTransactions({
            from: null,
            kind: userTransactions.filter.length === 2 ? undefined : userTransactions.filter[0],
            limit: userTransactions.pagination.limit,
            offset: userTransactions.pagination.currentPage * userTransactions.pagination.limit,
            ordering: userTransactions.ordering,
            to: null,
            userAddress: null,
        })
    }

    const onPrevPage = async () => {
        userTransactions.setState('pagination', {
            ...userTransactions.pagination,
            currentPage: userTransactions.pagination.currentPage - 1,
        })
        userTransactions.getTransactions({
            from: null,
            kind: userTransactions.filter.length === 2 ? undefined : userTransactions.filter[0],
            limit: userTransactions.pagination.limit,
            offset: userTransactions.pagination.currentPage * userTransactions.pagination.limit,
            ordering: userTransactions.ordering,
            to: null,
            userAddress: null,
        })
    }

    const onSubmitPage = async (value: number) => {
        userTransactions.setState('pagination', {
            ...userTransactions.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <Flex justifyContent="between" className="pagination-container">
                    <DownloadCsv
                        filename="TransactionsUser.csv"
                        keys={[
                            'userAddress',
                            'amount',
                            'kind',
                            'transactionHash',
                            'transactionTime',
                        ]}
                        items={userTransactions?.transactions?.map(page => [
                            page.userAddress,
                            page.amount,
                            page.kind,
                            page.transactionHash,
                            formatDate((page.transactionTime || 0) * 1000), ,
                        ])}
                    />
                    <Pagination
                        currentPage={userTransactions.pagination.currentPage + 1}
                        totalPages={userTransactions.pagination.totalPages}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                        onSubmit={onSubmitPage}
                    />
                </Flex>
            )}
        </Observer>
    )
}


function TransactionUserListFilterInner(): JSX.Element {

    const current = React.useRef<UserTransactionsKind[]>([])
    const userTransactions = useStore(UserTransactionsStore)
    const intl = useIntl()

    const onChange = (e: UserTransactionsKind[]) => {
        current.current = e
        userTransactions.setState('filter', e)

        userTransactions.getTransactions({
            from: null,
            kind: e.length === 2 ? undefined : e[0],
            limit: userTransactions.pagination.limit,
            offset: userTransactions.pagination.currentPage * userTransactions.pagination.limit,
            ordering: userTransactions.ordering,
            to: null,
            userAddress: null,
        })
    }

    const options = [
        {
            label: intl.formatMessage({
                id: 'USER_DEPOSIT',
            }),
            value: UserTransactionsKind.DEPOSIT,
        },
        {
            label: intl.formatMessage({
                id: 'USER_WITHDRAW',
            }),
            value: UserTransactionsKind.WITHDRAWAL,
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

export const TabelUserTransactionsDashboard = observer(TabelUserTransactionsDashboardInner)
export const TransactionUserListFilter = observer(TransactionUserListFilterInner)
