import * as React from 'react'
import styles from './tabelDepoolsDashboard.module.scss'
import classNames from 'classnames'
import Media from 'react-media'
import { Flex, Heading } from '@broxus/react-uikit'

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
    }
]
export function TabelTransactionsDashboard(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' >
                <Heading component='h2'>
                    General information
                </Heading>
                <div className="card card--flat card--xsmall">
                    <div className={classNames('list', styles.pools_list, styles.list)}>
                        <Media query={{ minWidth: 640 }}>
                            <DepoolsListHeader />
                        </Media>
                        {transactions.map((trans, idx) => (
                            <div className="panel-loader">
                                <div className={classNames('panel-loader__content')} >
                                    <Media key={trans.date_time.time} query={{ minWidth: 640 }}>
                                        <DepoolsListItem
                                            key={trans.date_time.time}
                                            idx={idx + 1}
                                            pool={trans}
                                        />
                                    </Media>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Flex>
        </>
    )
}

export function DepoolsListHeader(): JSX.Element {
    return (
        <div className="list__header">
            <div className="list__cell list__cell--left">
                Depool
            </div>
            <div className="list__cell list__cell--left">
                Transaction
            </div>
            <div className="list__cell list__cell--left">
                Strategy
            </div>
            <div className="list__cell list__cell--left">
                Type
            </div>
            <div className="list__cell list__cell--left">
                Value
            </div>
            <div className="list__cell list__cell--right">
                Date & Time
            </div>
        </div>
    )
}

type Props = {
    idx: number;
    pool: any;
}

export function DepoolsListItem({ idx, pool }: Props): JSX.Element {
    return (
        <div className="list__row">
            <div className="list__cell list__cell--left">
                {pool.depool}
            </div>
            <div className="list__cell list__cell--left">
                {pool.transaction}
            </div>
            <div className="list__cell list__cell--left">
                {pool.strategy}
            </div>
            <div className="list__cell list__cell--left">
                {pool.type}
            </div>
            <div className="list__cell list__cell--left">
                {pool.value}
            </div>
            <div className="list__cell list__cell--right">
                {pool.date_time.date}
            </div>
        </div>
    )
}