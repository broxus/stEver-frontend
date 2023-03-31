import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Label, Link, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { makeArray, sliceAddress } from '@broxus/js-utils'
import { generatePath, NavLink } from 'react-router-dom'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { useStore } from '@/hooks/useStore'
import { Direction, StrategyColumn } from '@/apiClientCodegen'
import { PanelLoader } from '@/components/common/PanelLoader'
import { appRoutes } from '@/routes'

import { TabelDepoolsStore } from '../store/depoolsStore'
import { ST_EVER_DECIMALS } from '@/config'
import { ExplorerAccountLink, FormattedTokenAmount, Icon } from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'

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
                        <Tile type="default" className="uk-padding-remove">
                            {tabelDepools.isFetching ?
                                <PoolsListPlaceholder />
                                :
                                <>
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
                                </>
                            }

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
        tabelDepools.setState('ordering', value)
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left uk-width-small">Strategy</th>
                <th className="uk-text-left uk-width-small">Validator fee</th>
                <th className="uk-text-left uk-width-small">Depool</th>
                <th className="uk-text-left uk-width-small">Owner</th>
                <th className="uk-text-left uk-width-small">
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={StrategyColumn.PRIORITY}
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                            >
                                Priority
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
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                                positionLeft={true}
                            >
                                TVL, EVER
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
                        type={pool.priority === 'high' ? 'danger' : pool.priority === 'medium' ? 'warning' : 'success'}
                    >
                        {pool.priority.charAt(0).toUpperCase() + pool.priority.slice(1)}
                    </Label>
                </td>
                <td className="uk-text-right uk-width-small">
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
