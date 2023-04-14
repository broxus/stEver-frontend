import * as React from 'react'
import Media from 'react-media'
import {
    Drop,
    Flex, Grid, Heading, Label, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { makeArray, sliceAddress } from '@broxus/js-utils'
import { generatePath, NavLink } from 'react-router-dom'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { useStore } from '@/hooks/useStore'
import { Direction, StrategyColumn, UsersWithdrawalsStatus } from '@/apiClientCodegen'
import { appRoutes } from '@/routes'

import { TabelDepoolsStore } from '../store/depoolsStore'
import { ST_EVER_DECIMALS } from '@/config'
import { AccountIcon, ExplorerAccountLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'
import { RateChange } from '@/components/common/RateChange'
import BigNumber from 'bignumber.js'
import { Placeholder } from '@/components/common/Placeholder'
import { useIntl } from 'react-intl'
import { MyWithdrawStore } from '../store/myWithdrawStore'

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
                                        <DepoolsListHeader myWithdraw={myWithdraw} />
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

type DepoolsListHeaderType = {
    myWithdraw: MyWithdrawStore
}

export function DepoolsListHeader({ myWithdraw }: DepoolsListHeaderType): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWalletContext()

    const onSwitchOrdering = async (value: any) => {
        myWithdraw.setState('ordering', value)

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

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'STRATEGY',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'VALIDATOR_FEE',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'DEPOOL',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    {intl.formatMessage({
                        id: 'OWNER',
                    })}
                </th>
                <th className="uk-text-left uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={StrategyColumn.PRIORITY}
                                value={{ column: myWithdraw.ordering.column, direction: myWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                {intl.formatMessage({
                                    id: 'DISTRIBUTION_PRIORITY',
                                })}
                                <Drop
                                    trigger={['hover']}
                                    placement="bottom-right"
                                    overlay={(
                                        <Tile type="default" size="xsmall">
                                            <Text component="p">
                                                {intl.formatMessage({
                                                    id: 'STAKES_ARE_DISTRIBUTED',
                                                })}
                                            </Text>
                                        </Tile>
                                    )}
                                >
                                    <Link
                                        type="text"
                                    >
                                        <svg style={{
                                            marginTop: "-4px",
                                            marginLeft: "5px"
                                        }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.2 3.40002H8.8V5.00002H7.2V3.40002ZM7.2 6.59998H8.8V12.6H7.2V6.59998Z" fill="#C6C9CF" />
                                        </svg>

                                    </Link>

                                </Drop>
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
                                column={StrategyColumn.TVL}
                                value={{ column: myWithdraw.ordering.column, direction: myWithdraw.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                                positionLeft={true}
                            >
                                {intl.formatMessage({
                                    id: 'TVL_EVER',
                                })}
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
            </tr>
        </thead>
    )
}

type DepoolsListItemType = {
    idx: number;
    pool: any;
}

export function DepoolsListItem({ pool }: DepoolsListItemType): JSX.Element {
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
                <td className="uk-text-left uk-width-small">{pool.validatorFee}</td>

                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.depool}>
                            <Flex>
                                {sliceAddress(pool.depool)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} type='' icon='externalLink' />
                            </Flex>
                        </ExplorerAccountLink>
                    </Link>
                </td>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.owner}>
                            <Flex>
                                {sliceAddress(pool.owner)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} icon='externalLink' />
                            </Flex>
                        </ExplorerAccountLink>
                    </Link>
                </td>

                <td className="uk-text-left uk-width-small">
                    <Label
                        type={pool.priority === 'high' ? 'success' : pool.priority === 'medium' ? 'warning' : 'danger'}
                    >
                        {pool.priority.charAt(0).toUpperCase() + pool.priority.slice(1)}
                    </Label>
                </td>
                <td className="uk-text-right uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.tvl}
                    />
                    <br />
                    {pool?.tvlDeltaNextRound &&
                        <RateChange size="sm" currency="" value={
                            new BigNumber(pool?.tvlDeltaNextRound ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed()
                        } />
                    }
                </td>
            </tr>
        </tbody>
    )
}


type DepoolsListCardType = {
    idx: number;
    pool: any;
}

export function DepoolsListCard({ pool }: DepoolsListCardType): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()
    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap='xsmall'>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title'>
                        <NavLink to={generatePath(appRoutes.strategy.path, {
                            id: pool.strategy,
                        })}>
                            <Flex>
                                <AccountIcon className='uk-margin-small-right' size={20} address={pool.strategy} />
                                {sliceAddress(pool.strategy)}
                            </Flex>
                        </NavLink>
                    </Text>
                    <Text className='uk-margin-auto-vertical'>
                        <Label
                            type={pool.priority === 'high' ? 'success' : pool.priority === 'medium' ? 'warning' : 'danger'}
                        >
                            {pool.priority.charAt(0).toUpperCase() + pool.priority.slice(1)}
                        </Label>
                    </Text>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'FEE',
                        })}
                    </Text>
                    <Text className='uk-margin-auto-vertical' size='small'>{pool.validatorFee}%</Text>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'DEPOOL',
                        })}
                    </Text>
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.depool}>
                            <Text className='uk-margin-auto-vertical' size='small'>
                                {sliceAddress(pool.depool)}
                            </Text>
                        </ExplorerAccountLink>
                    </Link>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'OWNER',
                        })}
                    </Text>
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.owner}>
                            <Flex>
                                <Text className='uk-margin-auto-vertical' size='small'>
                                    {sliceAddress(pool.owner)}
                                </Text>
                            </Flex>
                        </ExplorerAccountLink>
                    </Link>
                </Flex>
                <Flex justifyContent='between'>
                    <Text className='uk-margin-auto-vertical listCard--title' size='small'>
                        {intl.formatMessage({
                            id: 'TVL_EVER',
                        })}
                    </Text>
                    <Text className='uk-margin-auto-vertical'>
                        <FormattedTokenAmount
                            decimals={ST_EVER_DECIMALS}
                            value={pool.tvl}
                        />
                    </Text>
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
