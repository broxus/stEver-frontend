import * as React from 'react'
import styles from './tabelDepoolsDashboard.module.scss'
import classNames from 'classnames'
import Media from 'react-media'
import { Flex, Heading, Link, Tile } from '@broxus/react-uikit'
import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

const transactions = [
    {
        depool: "0:5iHe...8ob3",
        transaction: "0:5b8...f90",
        strategy: "0:5b8...f90",
        type: "Deposit to strategy",
        value: "11 000",
        date_time: {
            time: "17:22:14",
            date: "Jun 07, 2021"
        }
    },
    {
        depool: "0:5iHe...8ob3",
        transaction: "0:5b8...f90",
        strategy: "0:5b8...f90",
        type: "Deposit to strategy",
        value: "11 000",
        date_time: {
            time: "17:22:14",
            date: "Jun 07, 2021"
        }
    },
    {
        depool: "0:5iHe...8ob3",
        transaction: "0:5b8...f90",
        strategy: "0:5b8...f90",
        type: "Deposit to strategy",
        value: "11 000",
        date_time: {
            time: "17:22:14",
            date: "Jun 07, 2021"
        }
    },
    {
        depool: "0:5iHe...8ob3",
        transaction: "0:5b8...f90",
        strategy: "0:5b8...f90",
        type: "Deposit to strategy",
        value: "11 000",
        date_time: {
            time: "17:22:14",
            date: "Jun 07, 2021"
        }
    },
    {
        depool: "0:5iHe...8ob3",
        transaction: "0:5b8...f90",
        strategy: "0:5b8...f90",
        type: "Deposit to strategy",
        value: "11 000",
        date_time: {
            time: "17:22:14",
            date: "Jun 07, 2021"
        }
    }
]
export function TabelTransactionsDashboard(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' >
                <Heading component='h4'>
                    Transactions
                </Heading>
                <Tile type='default' size='xsmall'>
                    <table className="uk-table uk-table-divider uk-width-1-1 table">
                        <Media query={{ minWidth: 640 }}>
                            <TransactionListHeader />
                        </Media>
                        {transactions.map((trans, idx) => (
                            <Media key={trans.depool} query={{ minWidth: 640 }}>
                                <TransactionListItem
                                    key={trans.depool}
                                    idx={idx + 1}
                                    pool={trans}
                                />
                            </Media>
                        ))}
                    </table>
                    <TransactionListPagination />
                </Tile>
            </Flex>
        </>
    )
}

export function TransactionListHeader(): JSX.Element {
    const onSwitchOrdering = async (value: any) => {
        alert("onSwitchOrdering")
    }

    return (
        <>
            <thead className='uk-height-small'>
                <tr>
                    <th className='uk-text-left'>Depool</th>
                    <th className='uk-text-left'>Transaction</th>
                    <th className='uk-text-left'>Strategy</th>
                    <th className='uk-text-left'>Type</th>
                    <th className='uk-text-left'>Value</th>
                    <th className='uk-text-right'>
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
        </>
    )
}

type Props = {
    idx: number;
    pool: any;
}

export function TransactionListItem({ idx, pool }: Props): JSX.Element {
    return (
        <>
            <tbody className='uk-height-small'>
                <tr>
                    <td className='uk-text-left'><Link>{pool.depool}</Link></td>
                    <td className='uk-text-left'><Link>{pool.transaction}</Link></td>
                    <td className='uk-text-left'><Link>{pool.strategy}</Link></td>
                    <td className='uk-text-left'>{pool.type}</td>
                    <td className='uk-text-left'>{pool.value}</td>
                    <td className='uk-text-right'>{pool.date_time.date}</td>
                </tr>
            </tbody>
        </>
    )
}

export function TransactionListPagination(): JSX.Element {

    const onNextPage = async () => {
        alert("Next")
    }

    const onPrevPage = async () => {
        alert("Prev")
    }

    const onSubmitPage = async (value: number) => {
        alert("Sub")
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