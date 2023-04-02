import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Grid, Heading, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'

import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import {
    Direction, UserWithdrawalColumn, UserWithdrawalResponse, UsersWithdrawalsStatus,
} from '@/apiClientCodegen'

import { UserWithdrawStore } from '../store/userWithdrawStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { AccountIcon, ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { Date } from '@/components/common/Date'
import { formatDate } from '@/utils'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'


function TabelUserWithdrawDashboardInner(): JSX.Element {
    const userWithdraw = useStore(UserWithdrawStore)
    return (
        <Observer>
            {() => (
                <PanelLoader loading={userWithdraw.isFetching}>
                    <Tile type="default" className="uk-padding-remove">
                        {userWithdraw.isFetching ?
                            <Media query={{ minWidth: 640 }}>
                                {matches => matches ?
                                    (<PoolsListPlaceholder />)
                                    :
                                    (<PoolsListMobilePlaceholder />)
                                }
                            </Media>
                            :
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
                            </>
                        }
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

        userWithdraw.getTransactions({
            limit: userWithdraw.pagination.limit,
            offset: userWithdraw.pagination.currentPage * userWithdraw.pagination.limit,
            ordering: value,
            userAddress: null,
            status: UsersWithdrawalsStatus.PENDING,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">User</th>
                <th className="uk-text-left uk-width-small">Transaction</th>
                <th className="uk-text-left uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={UserWithdrawalColumn.ST_AMOUNT}
                                value={{ column: userWithdraw.ordering.column, direction: userWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                Value, stEver
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
                <td className="uk-text-left uk-width-small"><Link><ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>{sliceAddress(pool.transactionHash)}</ExplorerTransactionLink></Link></td>
                <td className="uk-text-left uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.stAmount ?? 0}
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
                        <Link>
                            <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.userAddress}>
                                <Text className='uk-margin-auto-vertical' size='small'>
                                    <AccountIcon className='uk-margin-small-right' size={20} address={pool.userAddress} />
                                    {sliceAddress(pool.userAddress)}
                                </Text>
                            </ExplorerAccountLink>
                        </Link>
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
            status: UsersWithdrawalsStatus.PENDING,
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
            status: UsersWithdrawalsStatus.PENDING,
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
