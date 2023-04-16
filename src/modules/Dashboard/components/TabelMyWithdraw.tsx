import * as React from 'react'

import { useStore } from '@/hooks/useStore'
import { useTvmWalletContext } from '@broxus/react-modules'
import { useIntl } from 'react-intl'
import { observer } from 'mobx-react-lite'
import { generatePath, NavLink } from 'react-router-dom'
import { appRoutes } from '@/routes'
import { sliceAddress } from '@broxus/js-utils'
import { UserWithdrawalResponse, UsersWithdrawalsStatus } from '@/apiClientCodegen'
import { ST_EVER_DECIMALS } from '@/config'
import { FormattedTokenAmount } from '@broxus/react-components'
import { Date } from '@/components/common/Date'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { Pagination } from '@/components/common/Pagination'
import { MyWithdrawStore } from '../store/myWithdrawStore'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'

import { Button, Flex } from '@broxus/react-uikit'
import { Grid } from '@broxus/react-uikit'
import { Heading } from '@broxus/react-uikit'
import { Link } from '@broxus/react-uikit'
import { Text } from '@broxus/react-uikit'
import { Tile } from '@broxus/react-uikit'

import { Observer } from 'mobx-react-lite'
import Media from 'react-media'

export function TabelMyWithdrawInner(): JSX.Element {
    const myWithdraw = useStore(MyWithdrawStore)
    const intl = useIntl()
    const wallet = useTvmWalletContext()

    React.useEffect(() => {
        if (wallet.isConnected)
            myWithdraw.getTransactions({
                limit: myWithdraw.pagination.limit,
                offset: myWithdraw.pagination.currentPage * myWithdraw.pagination.limit,
                ordering: myWithdraw.ordering,
                userAddress: wallet.address?.toString(),
                status: UsersWithdrawalsStatus.PENDING,
                amountGe: undefined,
                amountLe: undefined,
            })
    }, [wallet.isConnected])

    console.log(myWithdraw.isFetching)
    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                {intl.formatMessage({
                    id: 'YOUR_PENDING_WITHDRAWALS',
                })}
            </Heading>
            <Observer>
                {() => (
                    <Tile type="default" className="uk-padding-remove">
                        {myWithdraw.isFetching ?
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
                                        <DepoolsListHeader />
                                    </Media>
                                    {myWithdraw.transactions?.map((pool, idx) => (
                                        <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                            {matches => (matches ? (
                                                <DepoolsListItem
                                                    key={pool.transactionHash}
                                                    idx={idx + 1}
                                                    pool={pool}
                                                />
                                            ) : (
                                                <DepoolsListCard
                                                    key={pool.transactionHash}
                                                    idx={idx + 1}
                                                    pool={pool}
                                                />
                                            ))}
                                        </Media>
                                    ))}
                                </table>
                                {!myWithdraw.transactions?.length &&
                                    <Tile className="empty-list">
                                        <Flex justifyContent="center">
                                            <Text className="uk-margin-auto-vertical">
                                                {intl.formatMessage({
                                                    id: 'THE_LIST_IS_EMPTY',
                                                })}
                                            </Text>
                                        </Flex>
                                    </Tile>
                                }
                            </>
                        }
                        {myWithdraw.transactions?.length ?
                            <DepoolsListPagination myWithdraw={myWithdraw} />
                            :
                            undefined
                        }
                    </Tile>
                )}
            </Observer>
        </Flex >
    )
}

export function DepoolsListHeader(): JSX.Element {
    const intl = useIntl()

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'HASH',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'AMOUNT_STEVER',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'MINIMUM_YOU_RECEIVE',
                    })}
                </th>
                <th className="uk-text-right uk-width-small">
                    {intl.formatMessage({
                        id: 'CREATION_TIME',
                    })}
                </th>
                <th className="uk-text-right uk-width-small" />
            </tr>
        </thead>
    )
}

type DepoolsListItemType = {
    idx: number;
    pool: UserWithdrawalResponse;
}

export function DepoolsListItem({ pool }: DepoolsListItemType): JSX.Element {
    const myWithdraw = useStore(MyWithdrawStore)

    return (
        <tbody className="uk-height-small" >
            <tr>
                <td className="uk-text-left uk-width-small">
                    <NavLink to={generatePath(appRoutes.strategy.path, {
                        id: pool.transactionHash,
                    })}
                    >
                        {sliceAddress(pool.transactionHash)}
                    </NavLink>
                </td>
                <td className="uk-text-left uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.stAmount ?? 0}
                    />
                </td>
                <td className="uk-text-left uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount ?? 0}
                    />
                </td>
                <td className="uk-text-right uk-width-small">
                    <Flex flexDirection='column'>
                        <Date time={pool.transactionTime * 1000} />
                    </Flex>
                </td>
                <td className="uk-text-right uk-width-small">
                    <Button style={{
                        padding: "6px 10px",
                        fontSize: "14px",
                        lineHeight: "normal",
                        fontWeight: 400
                    }} type='default'
                        onClick={() => {
                            myWithdraw.removePendingWithdraw(pool.nonce)
                        }}
                    >
                        Cancel
                    </Button>
                </td>
            </tr>
        </tbody >
    )
}


type DepoolsListCardType = {
    idx: number;
    pool: UserWithdrawalResponse;
}

export function DepoolsListCard({ pool }: DepoolsListCardType): JSX.Element {
    const intl = useIntl()
    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap='xsmall'>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title'>
                        <NavLink to={generatePath(appRoutes.strategy.path, {
                            id: pool.transactionHash,
                        })}
                        >
                            {sliceAddress(pool.transactionHash)}
                        </NavLink>
                    </Text>
                    <Text className='uk-margin-auto-vertical'>
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.stAmount ?? 0}
                        />
                    </Text>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'MINIMUM_YOU_RECEIVE',
                        })}
                    </Text>
                    <Text className='uk-margin-auto-vertical' size='small'>
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.amount ?? 0}
                        />
                    </Text>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'CREATION_TIME',
                        })}
                    </Text>
                    <Link>
                        <Flex flexDirection='column'>
                            <Date time={pool.transactionTime * 1000} />
                        </Flex>
                    </Link>
                </Flex>
            </Grid>
        </Tile>
    )
}


type DepoolsListPaginationType = {
    myWithdraw: MyWithdrawStore
}

export function DepoolsListPagination({ myWithdraw }: DepoolsListPaginationType): JSX.Element {
    const wallet = useTvmWalletContext()

    const onNextPage = async () => {
        myWithdraw.setState('pagination', {
            ...myWithdraw.pagination,
            currentPage: myWithdraw.pagination.currentPage + 1,
        })
        myWithdraw.getTransactions({
            limit: myWithdraw.pagination.limit,
            offset: myWithdraw.pagination.currentPage * myWithdraw.pagination.limit,
            ordering: myWithdraw.ordering,
            userAddress: wallet.address?.toString(),
            status: UsersWithdrawalsStatus.PENDING,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    const onPrevPage = async () => {
        myWithdraw.setState('pagination', {
            ...myWithdraw.pagination,
            currentPage: myWithdraw.pagination.currentPage - 1,
        })
        myWithdraw.getTransactions({
            limit: myWithdraw.pagination.limit,
            offset: myWithdraw.pagination.currentPage * myWithdraw.pagination.limit,
            ordering: myWithdraw.ordering,
            userAddress: wallet.address?.toString(),
            status: UsersWithdrawalsStatus.PENDING,
            amountGe: undefined,
            amountLe: undefined,
        })
    }

    const onSubmitPage = async (value: number) => {
        myWithdraw.setState('pagination', {
            ...myWithdraw.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <>
                    <Flex justifyContent="between" className="pagination-container">
                        <DownloadCsv
                            filename="DePools.csv"
                            keys={[
                                'depool',
                                'owner',
                                'priority',
                                'strategy',
                                'tvl',
                                'validatorFee',
                            ]}
                            items={myWithdraw?.transactions?.map(page => [
                                page.amount,
                                page.nonce,
                                page.stAmount,
                                page.status,
                                page.transactionHash,
                                page.transactionTime,
                                page.userAddress,
                            ])}
                        />
                        <Pagination
                            currentPage={myWithdraw.pagination.currentPage + 1}
                            totalPages={myWithdraw.pagination.totalPages}
                            onNext={onNextPage}
                            onPrev={onPrevPage}
                            onSubmit={onSubmitPage}
                        />
                    </Flex>
                </>

            )}
        </Observer>
    )
}


export const TabelMyWithdraw = observer(TabelMyWithdrawInner)