import * as React from 'react'
import Media from 'react-media'
import {
    Button,
    Checkbox,
    Drop,
    Flex, Heading, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'

import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import { Direction, UserTransactionColumn, UserTransactionResponse, UserTransactionsKind } from '@/apiClientCodegen'

import { UserTransactionsStore } from '../store/userTransactionsStore'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'
import { ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { Date } from '@/components/common/Date'
import { formatDate } from '@/utils'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { createPortal } from 'react-dom'

function TabelUserTransactionsDashboardInner(): JSX.Element {

    const userTransactions = useStore(UserTransactionsStore)

    return (
        <>
            <Observer>
                {() => (
                    <PanelLoader loading={userTransactions.isFetching}>
                        <Tile type="default" className="uk-padding-remove">
                            <table className="uk-table uk-table-divider uk-width-1-1 table">
                                <Media query={{ minWidth: 640 }}>
                                    <TransactionsListHeader userTransactions={userTransactions} />
                                </Media>
                                {userTransactions.transactions?.map((pool, idx) => (
                                    <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                        <TransactionsListItem
                                            key={pool.transactionHash}
                                            idx={idx + 1}
                                            pool={pool}
                                        />
                                    </Media>
                                ))}
                            </table>
                            <DepoolsListPagination userTransactions={userTransactions} />
                        </Tile>
                    </PanelLoader>
                )}
            </Observer>
        </>
    )
}

type TransactionsListHeaderType = {
    userTransactions: UserTransactionsStore
}

export function TransactionsListHeader({ userTransactions }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        userTransactions.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">User</th>
                <th className="uk-text-left uk-width-small">Transaction</th>
                <th className="uk-text-left uk-width-small">Type</th>
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
                                Value, EVER
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
    pool: UserTransactionResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {

    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>
                            <Flex>
                                {sliceAddress(pool.userAddress)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} type='' icon='externalLink' />
                            </Flex>
                        </ExplorerAccountLink></Link></td>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerTransactionLink baseUrl={wallet.network?.explorer.baseUrl} subPath='transactions' txHash={pool.transactionHash}>
                            <Flex>
                                {sliceAddress(pool.transactionHash)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} type='' icon='externalLink' />
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small">{pool.kind}</td>
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
    userTransactions: UserTransactionsStore
}
export function DepoolsListPagination({ userTransactions }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        userTransactions.setState('pagination', {
            ...userTransactions.pagination,
            currentPage: userTransactions.pagination.currentPage + 1,
        })
    }

    const onPrevPage = async () => {
        userTransactions.setState('pagination', {
            ...userTransactions.pagination,
            currentPage: userTransactions.pagination.currentPage - 1,
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

    const onChange = (e: UserTransactionsKind[]) => {
        current.current = e
        userTransactions.setState("filter", e)
    }

    const options = [
        {
            label: 'User deposit',
            value: UserTransactionsKind.DEPOSIT,
        },
        {
            label: 'User withdraw',
            value: UserTransactionsKind.WITHDRAWAL,
        }
    ]
    return (
        <Drop
            trigger={['hover']}
            placement="bottom-right"
            overlay={(
                <Tile type="default" size="xsmall">
                    <Text component="h6">Type</Text>
                    <Checkbox.Group
                        options={options}
                        onChange={onChange}
                        stack={true}
                    />
                </Tile>
            )}
        >
            <Button type='secondary'>
                Type
            </Button>
        </Drop>
    )
}

export const TabelUserTransactionsDashboard = observer(TabelUserTransactionsDashboardInner)
export const TransactionUserListFilter = observer(TransactionUserListFilterInner)
