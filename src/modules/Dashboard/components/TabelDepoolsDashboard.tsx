import * as React from 'react'
import Media from 'react-media'
import {
    Checkbox,
    Drop,
    Flex, Grid, Heading, Label, Link, Text, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { sliceAddress } from '@broxus/js-utils'
import { generatePath, NavLink } from 'react-router-dom'
import {
    AccountIcon, ExplorerAccountLink, FormattedTokenAmount,
} from '@broxus/react-components'
import { useTvmWalletContext } from '@broxus/react-modules'
import BigNumber from 'bignumber.js'
import { useIntl } from 'react-intl'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'
import { useStore } from '@/hooks/useStore'
import {
    Direction, type StrategiesOrdering, StrategyColumn, type StrategyInfo,
} from '@/apiClientCodegen'
import { appRoutes } from '@/routes'
import { ST_EVER_DECIMALS } from '@/config'
import { DownloadCsv } from '@/components/common/DownloadCsv'
import { RateChange } from '@/components/common/RateChange'
import { Placeholder } from '@/components/common/Placeholder'

import { PoolsListPlaceholder } from './placeholders/TabelDepoolsPlaceholder'
import { PoolsListMobilePlaceholder } from './placeholders/TabelDepoolsMobilePlaceholder'
import { TabelDepoolsStore } from '../store/depoolsStore'
import { FaveButton } from '@/components/common/FaveButton'
import { useFavoritesPoolsStorage } from '@/hooks/useFavoritesPoolsStorage'


export function TabelDepoolsDashboardInner(): JSX.Element {
    const tabelDepools = useStore(TabelDepoolsStore)
    const intl = useIntl()
    const pools = useFavoritesPoolsStorage()

    const onChange = (e: boolean[]) => {
        tabelDepools.getDepoolsStrategies({
            depool: null,
            limit: tabelDepools.pagination.limit,
            offset: tabelDepools.pagination.currentPage * tabelDepools.pagination.limit,
            validatorFeeGe: null,
            validatorFeeLe: null,
            strategies: e[0] ? pools : null
        })
    }

    const options = [
        {
            label: intl.formatMessage({
                id: 'ONLY_FAOURITES_DEPOOLS',
            }),
            value: true,
        }
    ]

    return (
        <Flex flexDirection="column">
            <Flex justifyContent='between'>
                <Heading component="h4">
                    {intl.formatMessage({
                        id: 'PARTICIPATING_DEPOOLS',
                    })}
                    {!tabelDepools.isFetching
                        ? <Label style={{ marginTop: '-5px' }} className="uk-margin-small-left">{tabelDepools.pagination.totalCount}</Label>
                        : <Placeholder className="uk-margin-small-left" height={24} width={31} />}
                </Heading>
                {pools.length > 0 &&
                    <Checkbox.Group
                        options={options}
                        onChange={onChange}
                        stack
                    />
                }

            </Flex>

            <Observer>
                {() => (
                    <Tile type="default" className="uk-padding-remove">
                        {tabelDepools.isFetching
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
                                            <DepoolsListHeader tabelDepools={tabelDepools} />
                                        </Media>
                                        {tabelDepools.depoolsStrategies?.map((pool, idx) => (
                                            <Media key={pool.depool} query={{ minWidth: 640 }}>
                                                {matches => (matches ? (
                                                    <DepoolsListItem
                                                        key={pool.depool}
                                                        idx={idx + 1}
                                                        pool={pool}
                                                    />
                                                ) : (
                                                    <DepoolsListCard
                                                        key={pool.depool}
                                                        idx={idx + 1}
                                                        pool={pool}
                                                    />
                                                ))}
                                            </Media>
                                        ))}
                                    </table>
                                    {!tabelDepools.depoolsStrategies?.length
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
                        {tabelDepools.depoolsStrategies?.length
                            ? <DepoolsListPagination tabelDepools={tabelDepools} />
                            : undefined}
                    </Tile>
                )}
            </Observer>
        </Flex>
    )
}

type DepoolsListHeaderType = {
    tabelDepools: TabelDepoolsStore
}

export function DepoolsListHeader({ tabelDepools }: DepoolsListHeaderType): JSX.Element {
    const intl = useIntl()
    const onSwitchOrdering = async (value: StrategiesOrdering) => {
        tabelDepools.setState('ordering', value)

        tabelDepools.getDepoolsStrategies({
            depool: null,
            limit: tabelDepools.pagination.limit,
            offset: tabelDepools.pagination.currentPage * tabelDepools.pagination.limit,
            ordering: value,
            validatorFeeGe: null,
            validatorFeeLe: null,
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
                    <Observer>
                        {() => (
                            <OrderingSwitcher<Direction>
                                ascending={Direction.ASC}
                                descending={Direction.DESC}
                                column={StrategyColumn.PRIORITY}
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
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
                                        <svg
                                            style={{
                                                marginTop: '-4px',
                                                marginLeft: '5px',
                                            }} width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.2 3.40002H8.8V5.00002H7.2V3.40002ZM7.2 6.59998H8.8V12.6H7.2V6.59998Z"
                                                fill="#C6C9CF"
                                            />
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
                                value={{ column: tabelDepools.ordering.column, direction: tabelDepools.ordering.direction }}
                                onSwitch={onSwitchOrdering}
                                positionLeft
                            >
                                {intl.formatMessage({
                                    id: 'CURRENT_ROUND_TVL_EVER',
                                })}
                            </OrderingSwitcher>
                        )}
                    </Observer>
                </th>
                <th className="uk-text-right uk-width-small">
                    {intl.formatMessage({
                        id: 'NEXT_ROUND_TVL_EVER',
                    })}
                </th>
            </tr>
        </thead>
    )
}

type DepoolsListItemType = {
    idx: number;
    pool: StrategyInfo;
}

export function DepoolsListItem({ pool }: DepoolsListItemType): JSX.Element {
    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left uk-width-small">
                    <Flex>
                        <FaveButton poolAddress={pool.strategy} iconRatio={0.8} />
                        <NavLink to={generatePath(appRoutes.strategy.path, {
                            id: pool.strategy,
                        })}
                        >
                            {sliceAddress(pool.strategy)}
                        </NavLink>
                    </Flex>
                </td>
                <td className="uk-text-left uk-width-small">{pool.validatorFee}</td>
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
                </td>
                <td className="uk-text-right uk-width-small">
                    <FormattedTokenAmount
                        decimals={ST_EVER_DECIMALS}
                        value={new BigNumber(pool.tvl).plus(pool?.tvlDeltaNextRound ?? 0).toFixed()}
                    />
                    <br />
                    {pool?.tvlDeltaNextRound
                        && (
                            <RateChange
                                size="sm" currency="" value={
                                    new BigNumber(pool?.tvlDeltaNextRound ?? 0).shiftedBy(-ST_EVER_DECIMALS).integerValue().toFixed()
                                }
                            />
                        )}
                </td>
            </tr>
        </tbody>
    )
}


type DepoolsListCardType = {
    idx: number;
    pool: StrategyInfo;
}

export function DepoolsListCard({ pool }: DepoolsListCardType): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()
    return (
        <Tile className="listCard uk-padding-small">
            <Grid childWidth={1} gap="xsmall">
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title">
                        <NavLink to={generatePath(appRoutes.strategy.path, {
                            id: pool.strategy,
                        })}
                        >
                            <Flex>
                                <AccountIcon className="uk-margin-small-right" size={20} address={pool.strategy} />
                                {sliceAddress(pool.strategy)}
                            </Flex>
                        </NavLink>
                    </Text>
                    <Text className="uk-margin-auto-vertical">
                        <Label
                            type={pool.priority === 'high' ? 'success' : pool.priority === 'medium' ? 'warning' : 'danger'}
                        >
                            {pool.priority.charAt(0).toUpperCase() + pool.priority.slice(1)}
                        </Label>
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'FEE',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical" size="small">
                        {pool.validatorFee}
                        %
                    </Text>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'DEPOOL',
                        })}
                    </Text>
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.depool}>
                            <Text className="uk-margin-auto-vertical" size="small">
                                {sliceAddress(pool.depool)}
                            </Text>
                        </ExplorerAccountLink>
                    </Link>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'OWNER',
                        })}
                    </Text>
                    <Link>
                        <ExplorerAccountLink baseUrl={wallet.network?.explorer.baseUrl} address={pool.owner}>
                            <Flex>
                                <Text className="uk-margin-auto-vertical" size="small">
                                    {sliceAddress(pool.owner)}
                                </Text>
                            </Flex>
                        </ExplorerAccountLink>
                    </Link>
                </Flex>
                <Flex justifyContent="between">
                    <Text className="uk-margin-auto-vertical listCard--title" size="small">
                        {intl.formatMessage({
                            id: 'TVL_EVER',
                        })}
                    </Text>
                    <Text className="uk-margin-auto-vertical">
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
    tabelDepools: TabelDepoolsStore
}

export function DepoolsListPagination({ tabelDepools }: DepoolsListPaginationType): JSX.Element {

    const onNextPage = async () => {
        tabelDepools.setState('pagination', {
            ...tabelDepools.pagination,
            currentPage: tabelDepools.pagination.currentPage + 1,
        })
        tabelDepools.getDepoolsStrategies({
            depool: null,
            limit: tabelDepools.pagination.limit,
            offset: tabelDepools.pagination.currentPage * tabelDepools.pagination.limit,
            ordering: tabelDepools.ordering,
            validatorFeeGe: null,
            validatorFeeLe: null,
        })
    }

    const onPrevPage = async () => {
        tabelDepools.setState('pagination', {
            ...tabelDepools.pagination,
            currentPage: tabelDepools.pagination.currentPage - 1,
        })
        tabelDepools.getDepoolsStrategies({
            depool: null,
            limit: tabelDepools.pagination.limit,
            offset: tabelDepools.pagination.currentPage * tabelDepools.pagination.limit,
            ordering: tabelDepools.ordering,
            validatorFeeGe: null,
            validatorFeeLe: null,
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

            )}
        </Observer>
    )
}


export const TabelDepoolsDashboard = observer(TabelDepoolsDashboardInner)
