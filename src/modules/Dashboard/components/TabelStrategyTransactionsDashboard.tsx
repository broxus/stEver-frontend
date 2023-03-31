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

import { Pagination } from '@/components/common/Pagination'
import { useStore } from '@/hooks/useStore'
import { PanelLoader } from '@/components/common/PanelLoader'
import { Direction, SystemTransactionColumn, SystemTransactionResponse, SystemTransactionsKind } from '@/apiClientCodegen'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

import { StrategiesTransactionsStore } from '../store/strategiesTransactionsStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { NavLink, generatePath } from 'react-router-dom'
import { appRoutes } from '@/routes'
import { ExplorerAccountLink, ExplorerTransactionLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { Date } from '@/components/common/Date'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { formatDate } from '@/utils'
import { createPortal } from 'react-dom'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'

export function TabelStrategyTransactionsDashboardInner(): JSX.Element {

    const strategyTransactions = useStore(StrategiesTransactionsStore)

    return (
        <Observer>
            {() => (
                <PanelLoader loading={strategyTransactions.isFetching}>
                    <Tile type="default" className="uk-padding-remove">
                        {strategyTransactions.isFetching ?
                            <PoolsListPlaceholder />
                            :
                            <>
                                <table className="uk-table uk-table-divider uk-width-1-1 table">
                                    <Media query={{ minWidth: 640 }}>
                                        <TransactionsListHeader strategyTransactions={strategyTransactions} />
                                    </Media>
                                    {strategyTransactions.transactions?.map((pool, idx) => (
                                        <Media key={pool.transactionHash} query={{ minWidth: 640 }}>
                                            <TransactionsListItem
                                                key={pool.transactionHash}
                                                idx={idx + 1}
                                                pool={pool}
                                            />
                                        </Media>
                                    ))}

                                </table>
                                <DepoolsListPagination strategyTransactions={strategyTransactions} />
                            </>
                        }
                    </Tile>
                </PanelLoader>
            )}
        </Observer>
    )
}

type TransactionsListHeaderType = {
    strategyTransactions: StrategiesTransactionsStore
}

export function TransactionsListHeader({ strategyTransactions }: TransactionsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        strategyTransactions.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">Strategy</th>
                <th className="uk-text-left uk-width-small">Transaction</th>
                <th className="uk-text-left uk-width-small">Type</th>
                <th className="uk-text-left uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={SystemTransactionColumn.AMOUNT}
                                value={{ column: strategyTransactions.ordering.column, direction: strategyTransactions.ordering.direction }}
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
                                column={SystemTransactionColumn.CREATED_AT}
                                value={{ column: strategyTransactions.ordering.column, direction: strategyTransactions.ordering.direction }}
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
    pool: SystemTransactionResponse;
}

export function TransactionsListItem({ pool }: Props): JSX.Element {

    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-small">
                    <NavLink to={generatePath(appRoutes.strategy.path, {
                        id: pool.strategy,
                    })}
                    >
                        {sliceAddress(pool.strategy)}
                    </NavLink></td>
                <td className="uk-text-left uk-width-small">
                    <Link>
                        <ExplorerTransactionLink subPath='transactions' baseUrl={wallet.network?.explorer.baseUrl} txHash={pool.transactionHash}>
                            <Flex>
                                {sliceAddress(pool.transactionHash)}
                                <Icon className='uk-margin-auto-vertical uk-margin-small-left' ratio={0.6} type='' icon='externalLink' />
                            </Flex>
                        </ExplorerTransactionLink>
                    </Link></td>
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
    strategyTransactions: StrategiesTransactionsStore
}

export function DepoolsListPagination({ strategyTransactions }: TransactionsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: strategyTransactions.pagination.currentPage + 1,
        })
    }

    const onPrevPage = async () => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: strategyTransactions.pagination.currentPage - 1,
        })
    }

    const onSubmitPage = async (value: number) => {
        strategyTransactions.setState('pagination', {
            ...strategyTransactions.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <Flex justifyContent="between" className="pagination-container">
                    <DownloadCsv
                        filename="TransactionsStrategy.csv"
                        keys={[
                            'amount',
                            'kind',
                            'strategy',
                            'transactionHash',
                            'transactionTime',
                        ]}
                        items={strategyTransactions?.transactions?.map(page => [
                            page.amount,
                            page.kind,
                            page.strategy,
                            page.transactionHash,
                            formatDate((page.transactionTime || 0) * 1000), ,
                        ])}
                    />
                    <Pagination
                        currentPage={strategyTransactions.pagination.currentPage + 1}
                        totalPages={strategyTransactions.pagination.totalPages}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                        onSubmit={onSubmitPage}
                    />
                </Flex>
            )}
        </Observer>
    )
}


function TransactionStrtegyListFilterInner(): JSX.Element {

    const current = React.useRef<SystemTransactionsKind[]>([])
    const strategyTransactions = useStore(StrategiesTransactionsStore)

    const onChange = (e: SystemTransactionsKind[]) => {
        current.current = e
        strategyTransactions.setState("filter", e)
    }

    const options = [
        {
            label: 'Strategy deposit',
            value: SystemTransactionsKind.DEPOSIT,
        },
        {
            label: 'Strategy withdraw',
            value: SystemTransactionsKind.WITHDRAWAL,
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

export const TabelStrategyTransactionsDashboard = observer(TabelStrategyTransactionsDashboardInner)
export const TransactionStrtegyListFilter = observer(TransactionStrtegyListFilterInner)
