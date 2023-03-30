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
import {
    Direction, UserWithdrawalColumn, UserWithdrawalResponse,
} from '@/apiClientCodegen'

import { UserWithdrawStore } from '../store/userWithdrawStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { Date } from '@/components/common/Date'
import { formatDate } from '@/utils'
import { DownloadCsv } from '@/components/common/DownloadCsv'


function TabelUserWithdrawDashboardInner(): JSX.Element {

    const userWithdraw = useStore(UserWithdrawStore)

    return (
        <Observer>
            {() => (
                <PanelLoader loading={userWithdraw.isFetching}>
                    <Tile type="default" className="uk-padding-remove">
                        <table className="uk-table uk-table-divider uk-width-1-1 table">
                            <Media query={{ minWidth: 640 }}>
                                <TransactionsListHeader userWithdraw={userWithdraw} />
                            </Media>
                            {userWithdraw.transactions?.map((pool, idx) => (
                                <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                    <TransactionsListItem
                                        key={pool.transactionHash}
                                        idx={idx + 1}
                                        pool={pool}
                                    />
                                </Media>
                            ))}

                        </table>
                        <DepoolsListPagination userWithdraw={userWithdraw} />
                    </Tile>
                </PanelLoader>
            )}
        </Observer>
    )
}

type TransactionsListHeaderType = {
    userWithdraw: UserWithdrawStore
}

export function TransactionsListHeader({ userWithdraw }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        userWithdraw.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">User</th>
                <th className="uk-text-left">Transaction</th>
                <th className="uk-text-left">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={UserWithdrawalColumn.ST_AMOUNT}
                                value={{ column: userWithdraw.ordering.column, direction: userWithdraw.ordering.direction }}
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
                                column={UserWithdrawalColumn.CREATED_AT}
                                value={{ column: userWithdraw.ordering.column, direction: userWithdraw.ordering.direction }}
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
    pool: UserWithdrawalResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {

    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link><ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>{sliceAddress(pool.userAddress)}</ExplorerAccountLink></Link></td>
                <td className="uk-text-left"><Link><ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>{sliceAddress(pool.transactionHash)}</ExplorerTransactionLink></Link></td>
                <td className="uk-text-left">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount ?? 0}
                    />
                </td>
                <td className="uk-text-right">
                    <Flex flexDirection='column'>
                        <Date time={pool.transactionTime * 1000} />
                    </Flex>
                </td>
            </tr>
        </tbody>
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
    }

    const onPrevPage = async () => {
        userWithdraw.setState('pagination', {
            ...userWithdraw.pagination,
            currentPage: userWithdraw.pagination.currentPage - 1,
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
                <Flex justifyContent="between">
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

// function ListFilter(): JSX.Element {
//
//    const onChange = (e: any) => {
//        console.log(e)
//    }
//
//    return (
//        <Drop
//            trigger={['click']}
//            placement="bottom-right"
//            overlay={(
//                <Tile type="default" size="xsmall">
//                    <Text component="h6">Type</Text>
//                    <Grid gap="small">
//
//                        <Checkbox.Group
//                            options={[
//                                {
//
//                                    label: 'd',
//                                    value: false,
//
//                                },
//                            ]}
//                        />
//
//                        {/* <Checkbox onChange={onChange}>Strategy deposit</Checkbox>
//                        <Checkbox onChange={onChange}>Strategy pending withdraw</Checkbox> */}
//
//                    </Grid>
//                    <hr />
//                    <Flex justifyContent="between">
//                        <Link>Default</Link>
//                        <Flex>
//                            <Button size="small" type="default">
//                                Cancel
//                            </Button>
//                            <Button size="small" type="primary">
//                                Apply
//                            </Button>
//                        </Flex>
//                    </Flex>
//                </Tile>
//            )}
//        >
//            <Button type="default">
//                Type
//            </Button>
//        </Drop>
//    )
// }


export const TabelUserWithdrawDashboard = observer(TabelUserWithdrawDashboardInner)
