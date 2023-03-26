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


function TabelUserWithdrawDashboardInner(): JSX.Element {

    const userWithdraw = useStore(UserWithdrawStore)

    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Pendings withdraw
            </Heading>
            <Observer>
                {() => (
                    <PanelLoader loading={userWithdraw.isFetching}>
                        <Tile type="default" size="xsmall">
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
        </Flex>
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
                                value={userWithdraw.ordering.direction}
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
                                value={userWithdraw.ordering.direction}
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
    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link>{sliceAddress(pool.userAddress)}</Link></td>
                <td className="uk-text-left"><Link>{sliceAddress(pool.transactionHash)}</Link></td>
                <td className="uk-text-left">{pool.amount}</td>
                <td className="uk-text-right">{pool.transactionTime}</td>
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
                <Pagination
                    currentPage={userWithdraw.pagination.currentPage + 1}
                    totalPages={userWithdraw.pagination.totalPages}
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    onSubmit={onSubmitPage}
                />
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
