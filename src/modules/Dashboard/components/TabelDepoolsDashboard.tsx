import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Label, Link, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'
import { generatePath, NavLink } from 'react-router-dom'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { useStore } from '@/hooks/useStore'
import { Direction, StrategyColumn } from '@/apiClientCodegen'
import { PanelLoader } from '@/components/common/PanelLoader'
import { appRoutes } from '@/routes'

import { TabelDepoolsStore } from '../store/depoolsStore'
import BigNumber from 'bignumber.js'
import { ST_EVER_DECIMALS } from '@/config'
import { ExplorerAccountLink, FormattedTokenAmount } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { DownloadCsv } from '@/components/common/DownloadCsv'

export function TabelDepoolsDashboardInner(): JSX.Element {

    const tabelDepools = useStore(TabelDepoolsStore)

    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Participating depools
            </Heading>
            <Observer>
                {() => (
                    <PanelLoader loading={tabelDepools.isFetching}>
                        <Tile type="default" size="xsmall">
                            <table className="uk-table uk-table-divider uk-width-1-1 table">
                                <Media query={{ minWidth: 640 }}>
                                    <DepoolsListHeader tabelDepools={tabelDepools} />
                                </Media>
                                {tabelDepools.depoolsStrategies?.map((pool, idx) => (
                                    <Media key={pool.depool} query={{ minWidth: 640 }}>
                                        <DepoolsListItem
                                            key={pool.depool}
                                            idx={idx + 1}
                                            pool={pool}
                                        />
                                    </Media>
                                ))}
                            </table>
                            <DepoolsListPagination tabelDepools={tabelDepools} />
                        </Tile>
                    </PanelLoader>
                )}
            </Observer>
        </Flex>
    )
}

type DepoolsListHeaderType = {
    tabelDepools: TabelDepoolsStore
}

export function DepoolsListHeader({ tabelDepools }: DepoolsListHeaderType): JSX.Element {

    const onSwitchOrdering = async (value: any) => {
        console.log(value)

        tabelDepools.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">Strategy</th>
                <th className="uk-text-left">
                    {/* <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={StrategyColumn.PRIORITY}
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                Validator fee
                            </OrderingSwitcher>
                        )}
                    </Observer> */}
                    Validator fee
                </th>
                <th className="uk-text-left">Depool</th>
                <th className="uk-text-left">Owner</th>
                <th className="uk-text-left">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.DESC}
                                descending={Direction.ASC}
                                column={StrategyColumn.PRIORITY}
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                Priority
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
                                column={StrategyColumn.TVL}
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                TVL
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
    pool: any;
}

export function DepoolsListItem({ pool }: Props): JSX.Element {
    const { wallet } = useTvmWalletContext()

    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left">
                    <NavLink to={generatePath(appRoutes.strategy.path, {
                        id: pool.strategy,
                    })}
                    >
                        {sliceAddress(pool.strategy)}
                    </NavLink>
                </td>
                <td className="uk-text-left">{pool.validatorFee}</td>
                <td className="uk-text-left"><Link><ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.depool}>{sliceAddress(pool.depool)}</ExplorerAccountLink> </Link></td>
                <td className="uk-text-left"><Link><ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.owner}>{sliceAddress(pool.owner)}</ExplorerAccountLink></Link></td>
                <td className="uk-text-left">
                    <Label
                        type={pool.priority === 'high' ? 'danger' : pool.priority === 'medium' ? 'warning' : 'success'}
                    >
                        {pool.priority.charAt(0).toUpperCase() + pool.priority.slice(1)}
                    </Label>
                </td>
                <td className="uk-text-right">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={pool.tvl}
                    />
                </td>
            </tr>
        </tbody>
    )
}

type DepoolsListPaginationType = {
    tabelDepools: TabelDepoolsStore
}

export function DepoolsListPagination({ tabelDepools }: DepoolsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        tabelDepools.setState('pagination', {
            ...tabelDepools.pagination,
            currentPage: tabelDepools.pagination.currentPage + 1,
        })
    }

    const onPrevPage = async () => {
        tabelDepools.setState('pagination', {
            ...tabelDepools.pagination,
            currentPage: tabelDepools.pagination.currentPage - 1,
        })
    }

    const onSubmitPage = async (value: number) => {
        tabelDepools.setState('pagination', {
            ...tabelDepools.pagination,
            currentPage: value,
        })
    }

    return (
        <Observer>
            {() => (
                <>
                    <Flex justifyContent="between">
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
                            items={tabelDepools?.depoolsStrategies?.map(page => [
                                page.depool,
                                page.owner,
                                page.priority,
                                page.strategy,
                                page.validatorFee,
                            ])}
                        />
                        <Pagination
                            currentPage={tabelDepools.pagination.currentPage + 1}
                            totalPages={tabelDepools.pagination.totalPages}
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

export const TabelDepoolsDashboard = observer(TabelDepoolsDashboardInner)
