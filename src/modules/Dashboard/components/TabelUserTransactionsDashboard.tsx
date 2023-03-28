import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Link, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'

import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import { Direction, UserTransactionColumn, UserTransactionResponse } from '@/apiClientCodegen'

import { UserTransactionsStore } from '../store/userTransactionsStore'
import { ST_EVER_DECIMALS } from '@/config'
import BigNumber from 'bignumber.js'
import { ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'

function TabelUserTransactionsDashboardInner(): JSX.Element {

    const userTransactions = useStore(UserTransactionsStore)

    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Transactions
            </Heading>
            <Observer>
                {() => (
                    <PanelLoader loading={userTransactions.isFetching}>
                        <Tile type="default" size="xsmall">
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
        </Flex>
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
                <th className="uk-text-left">User</th>
                <th className="uk-text-left">Transaction</th>
                <th className="uk-text-left">Type</th>
                <th className="uk-text-left">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={UserTransactionColumn.AMOUNT}
                                value={userTransactions.ordering.direction}
                                onSwitch={onSwitchOrdering}
                            >
                                Value, EVER
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
                <th className="uk-text-right">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={UserTransactionColumn.CREATED_AT}
                                value={userTransactions.ordering.direction}
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
    pool: UserTransactionResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {

    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link><ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>{sliceAddress(pool.userAddress)}</ExplorerAccountLink></Link></td>
                <td className="uk-text-left"><Link><ExplorerTransactionLink baseUrl={wallet.network?.explorer.baseUrl} subPath='transactions' txHash={pool.transactionHash}>{sliceAddress(pool.transactionHash)}</ExplorerTransactionLink></Link></td>
                <td className="uk-text-left">{pool.kind}</td>
                <td className="uk-text-left">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount}
                    />
                </td>
                <td className="uk-text-right">{pool.transactionTime}</td>
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
                <Pagination
                    currentPage={userTransactions.pagination.currentPage + 1}
                    totalPages={userTransactions.pagination.totalPages}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onSubmit={onSubmitPage}
                />
            )}
        </Observer>
    )
}

export const TabelUserTransactionsDashboard = observer(TabelUserTransactionsDashboardInner)
