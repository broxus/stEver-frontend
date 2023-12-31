import * as React from 'react'
import { useTvmWalletContext } from '@broxus/react-modules'
import { useIntl } from 'react-intl'
import { observer, Observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'
import {
    AccountIcon, ExplorerTransactionLink, FormattedTokenAmount, Icon,
} from '@broxus/react-components'


import { Button, Flex } from '@broxus/react-uikit'
import { Grid } from '@broxus/react-uikit'
import { Heading } from '@broxus/react-uikit'
import { Link } from '@broxus/react-uikit'
import { Text } from '@broxus/react-uikit'
import { Tile } from '@broxus/react-uikit'

import Media from 'react-media'
import { Pagination } from '@/components/common/Pagination'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { Date } from '@/components/common/Date'
import { ST_EVER_DECIMALS } from '@/config'
import { type UserWithdrawalResponse, UsersWithdrawalsStatus } from '@/apiClientCodegen'
import { useStore } from '@/hooks/useStore'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { MyWithdrawStore } from '../store/myWithdrawStore'

export function TabelMyWithdrawInner(): JSX.Element {
    const myWithdraw = useStore(MyWithdrawStore)
    const intl = useIntl()
    const wallet = useTvmWalletContext()

    React.useEffect(() => {
        if (wallet.isConnected) {
            myWithdraw.getTransactions({
                limit: myWithdraw.pagination.limit,
                offset: myWithdraw.pagination.currentPage * myWithdraw.pagination.limit,
                ordering: myWithdraw.ordering,
                userAddress: wallet.address?.toString(),
                statuses: [UsersWithdrawalsStatus.PENDING],
                amountGe: undefined,
                amountLe: undefined,
            })
        }
    }, [wallet.isConnected])

    if (myWithdraw.transactions?.length > 0) {
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
                            {myWithdraw.isFetching
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
                                                <DepoolsListHeader />
                                            </Media>
                                            {myWithdraw.transactions?.map((pool, idx) => (
                                                <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                                    {matches => (matches ? (
                                                        <DepoolsListItem
                                                            key={pool.transactionHash}
                                                            idx={idx}
                                                            pool={pool}
                                                        />
                                                    ) : (
                                                        <DepoolsListCard
                                                            key={pool.transactionHash}
                                                            idx={idx}
                                                            pool={pool}
                                                        />
                                                    ))}
                                                </Media>
                                            ))}
                                        </table>
                                        {!myWithdraw.transactions?.length
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
                            {myWithdraw.transactions?.length
                                ? <DepoolsListPagination myWithdraw={myWithdraw} />
                                : undefined}
                        </Tile>
                    )}
                </Observer>
            </Flex>
        )
    }
    return (
        <></>
    )

}

export function DepoolsListHeader(): JSX.Element {
    const intl = useIntl()

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-medium">
                    {intl.formatMessage({
                        id: 'HASH',
                    })}
                </th>
                <th className="uk-text-left uk-width-medium">
                    {intl.formatMessage({
                        id: 'AMOUNT_STEVER',
                    })}
                </th>
                <th className="uk-text-left uk-width-medium">
                    {intl.formatMessage({
                        id: 'MINIMUM_YOU_RECEIVE',
                    })}
                </th>
                <th className="uk-text-right uk-width-large">
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

export function DepoolsListItem({ pool, idx }: DepoolsListItemType): JSX.Element {
    const myWithdraw = useStore(MyWithdrawStore)
    const wallet = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-medium">
                    <ExplorerTransactionLink subPath="transactions" baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                        <Flex>
                            {sliceAddress(pool.transactionHash)}
                            <Icon
                                className="uk-margin-auto-vertical uk-margin-small-left" ratio={0.6} type=""
                                icon="externalLink"
                            />
                        </Flex>
                    </ExplorerTransactionLink>
                </td>
                <td className="uk-text-left uk-width-medium">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.stAmount ?? 0}
                    />
                </td>
                <td className="uk-text-left uk-width-medium">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.amount ?? 0}
                    />
                </td>
                <td className="uk-text-right uk-width-large">
                    <Flex flexDirection="column">
                        <Date time={pool.transactionTime * 1000} />
                    </Flex>
                </td>
                <Observer>
                    {() => (
                        <td className="uk-text-right uk-width-auto">
                            <Button
                                style={{
                                    padding: '6px 10px',
                                    fontSize: '14px',
                                    lineHeight: 'normal',
                                    fontWeight: 400,
                                }}
                                type="default"
                                disabled={pool.status === UsersWithdrawalsStatus.CANCELLED}
                                onClick={() => {
                                    myWithdraw.removePendingWithdraw(pool.nonce, idx)
                                }}
                            >
                                Cancel
                            </Button>
                        </td>
                    )}
                </Observer>

            </tr>
        </tbody>
    )
}


type DepoolsListCardType = {
    idx: number;
    pool: UserWithdrawalResponse;
}

export function DepoolsListCard({ pool, idx }: DepoolsListCardType): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWalletContext()
    const myWithdraw = useStore(MyWithdrawStore)

    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap="xsmall">
                <Flex justifyContent="between">
                    <Link>
                        <ExplorerTransactionLink subPath="transactions" baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                <AccountIcon className="uk-margin-small-right" size={20} address={pool.userAddress} />
                                {sliceAddress(pool.transactionHash)}
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'MINIMUM_YOU_RECEIVE',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.amount ?? 0}
                        />
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'AMOUNT_STEVER',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.stAmount}
                        />
                    </Text>
                </Flex>
                {/* <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: "RATE",
                        })}
                    </Text>
                    <Text className='uk-margin-auto-vertical' size='small'>{

                    }</Text>
                </Flex> */}
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'CREATION_TIME',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        <Date line time={pool.transactionTime * 1000} />
                    </Text>
                </Flex>
                <Flex justifyContent="center">
                    <Button
                        disabled={pool.status === UsersWithdrawalsStatus.CANCELLED}
                        style={{
                            padding: '8px 10px',
                            fontSize: '14px',
                            lineHeight: 'normal',
                            fontWeight: 400,
                            width: '100%',
                            marginTop: '8px',
                        }} type="default"
                        onClick={() => {
                            myWithdraw.removePendingWithdraw(pool.nonce, idx)
                        }}
                    >
                        Cancel
                    </Button>
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
            statuses: [UsersWithdrawalsStatus.PENDING],
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
            statuses: [UsersWithdrawalsStatus.PENDING],
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
                <Flex justifyContent="between" className="pagination-container">
                    <DownloadCsv
                        filename="DePools.csv"
                        keys={[
                            'amount',
                            'nonce',
                            'stAmount',
                            'status',
                            'transactionHash',
                            'transactionTime',
                            'userAddress',
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

            )}
        </Observer>
    )
}


export const TabelMyWithdraw = observer(TabelMyWithdrawInner)
