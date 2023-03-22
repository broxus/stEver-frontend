import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Link, Tabs, Tile,
} from '@broxus/react-uikit'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

import './TabelWithdrawDashboard.scss'
import { transactions } from './_.mock'

import { createPortal } from 'react-dom'

import { TransactionListFilter } from './TabelTransactionsDashboard'

import { observer } from 'mobx-react-lite'

export function TabelWithdrawDashboardInner(): JSX.Element {

    const [elNavWrap, setElNavWrap] = React.useState<Element>()

    React.useEffect(() => {
        const elTabsId = document.getElementById('tabs-withdraw')
        const elNavWrap = elTabsId!.querySelector('.uk-tabs-nav-wrap')

        console.log(elNavWrap)
        if (elNavWrap) {
            setElNavWrap(elNavWrap)
        }
    }, [])


    return (
        <Flex flexDirection="column" className="tabelWithdrawDashboard">
            <Heading component="h4">
                Pendings withdraw
            </Heading>
            {elNavWrap
                && createPortal(
                    <TransactionListFilter />,
                    elNavWrap,
                )}
            <Tabs
                defaultActiveKey="1"
                id="tabs-withdraw"
                items={[
                    {
                        label: 'Users',
                        key: '1',
                        children: <WithdrawListUsers />,
                    },
                    {
                        label: 'Strategies',
                        key: '2',
                        children: <WithdrawListStrategies />,
                    },
                ]}
            />
        </Flex>
    )
}

export function WithdrawListUsers(): JSX.Element {
    return (
        <Tile type="default" size="xsmall" className="uk-margin-small-top">
            <table className="uk-table uk-table-divider uk-width-1-1 table">
                <Media query={{ minWidth: 640 }}>
                    <WithdrawListHeader />
                </Media>
                {transactions.map((trans, idx) => (
                    <Media key={trans.depool} query={{ minWidth: 640 }}>
                        <WithdrawListItem
                            key={trans.depool}
                            idx={idx + 1}
                            pool={trans}
                        />
                    </Media>
                ))}
            </table>
            <WithdrawListPagination />
        </Tile>
    )
}

export function WithdrawListStrategies(): JSX.Element {
    return (
        <Tile type="default" size="xsmall" className="uk-margin-small-top">
            <table className="uk-table uk-table-divider uk-width-1-1 table">
                <Media query={{ minWidth: 640 }}>
                    <WithdrawListHeader />
                </Media>
                {transactions.map((trans, idx) => (
                    <Media key={trans.depool} query={{ minWidth: 640 }}>
                        <WithdrawListItem
                            key={trans.depool}
                            idx={idx + 1}
                            pool={trans}
                        />
                    </Media>
                ))}
            </table>
            <WithdrawListPagination />
        </Tile>
    )
}

export function WithdrawListHeader(): JSX.Element {
    const onSwitchOrdering = async (value: any) => {
        alert('onSwitchOrdering')
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">Depool</th>
                <th className="uk-text-left">Transaction</th>
                <th className="uk-text-left">Strategy</th>
                <th className="uk-text-left">Type</th>
                <th className="uk-text-left">Value</th>
                <th className="uk-text-right">
                    <OrderingSwitcher<any>
                        ascending={1}
                        descending={1}
                        value={1}
                        onSwitch={onSwitchOrdering}
                    >
                        Date & Time
                    </OrderingSwitcher>
                </th>
            </tr>
        </thead>
    )
}

type Props = {
    idx: number;
    pool: any;
}

export function WithdrawListItem({ idx, pool }: Props): JSX.Element {
    return (
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link>{pool.depool}</Link></td>
                <td className="uk-text-left"><Link>{pool.transaction}</Link></td>
                <td className="uk-text-left"><Link>{pool.strategy}</Link></td>
                <td className="uk-text-left">{pool.type}</td>
                <td className="uk-text-left">{pool.value}</td>
                <td className="uk-text-right">{pool.date_time.date}</td>
            </tr>
        </tbody>
    )
}

export function WithdrawListPagination(): JSX.Element {

    const onNextPage = async () => {
        alert('Next')
    }

    const onPrevPage = async () => {
        alert('Prev')
    }

    const onSubmitPage = async (value: number) => {
        alert('Sub')
    }

    return (
        <Pagination
            currentPage={1}
            totalPages={10}
            onNext={onNextPage}
            onPrev={onPrevPage}
            onSubmit={onSubmitPage}
        />
    )
}

export const TabelWithdrawDashboard = observer(TabelWithdrawDashboardInner)
