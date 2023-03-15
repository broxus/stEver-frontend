import * as React from 'react'
import styles from './tabelDepoolsDashboard.module.scss'
import classNames from 'classnames'
import Media from 'react-media'
import { Flex, Heading, Tile } from '@broxus/react-uikit'

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
                    <table className="uk-table uk-table-divider uk-width-1-1">
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
                </Tile>
            </Flex>
        </>
    )
}

export function TransactionListHeader(): JSX.Element {
    return (
        <>
            <thead>
                <tr>
                    <th className='uk-text-left'>Depool</th>
                    <th className='uk-text-left'>Transaction</th>
                    <th className='uk-text-left'>Strategy</th>
                    <th className='uk-text-left'>Type</th>
                    <th className='uk-text-left'>Value</th>
                    <th className='uk-text-right'>Date & Time</th>
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
            <tbody>
                <tr>
                    <td className='uk-text-left'>{pool.depool}</td>
                    <td className='uk-text-left'>{pool.transaction}</td>
                    <td className='uk-text-left'>{pool.strategy}</td>
                    <td className='uk-text-left'>{pool.type}</td>
                    <td className='uk-text-left'>{pool.value}</td>
                    <td className='uk-text-right'>{pool.date_time.date}</td>
                </tr>
            </tbody>
        </>
    )
}