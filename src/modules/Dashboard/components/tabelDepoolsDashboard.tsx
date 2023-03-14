import * as React from 'react'
import styles from './tabelDepoolsDashboard.module.scss'
import classNames from 'classnames'
import Media from 'react-media'
import { Flex, Heading } from '@broxus/react-uikit'

const depools = [
    {
        depool: "0:5iHe...8ob3",
        validator_fee: "4.2%",
        strategy: "0:5b8...f90",
        owner: "0:5b8...f90",
        priority: "High",
        tvl: 1021000
    },
    {
        depool: "0:5iHe...8ob3",
        validator_fee: "4.2%",
        strategy: "0:5b8...f90",
        owner: "0:5b8...f90",
        priority: "High",
        tvl: 1021000
    },
]
export function TabelDepoolsDashboard(): JSX.Element {
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
                        {depools.map((pool, idx) => (
                            <div className="panel-loader">
                                <div className={classNames('panel-loader__content')} >
                                    <Media key={pool.depool} query={{ minWidth: 640 }}>
                                        <DepoolsListItem
                                            key={pool.depool}
                                            idx={idx + 1}
                                            pool={pool}
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
                Validator fee
            </div>
            <div className="list__cell list__cell--left">
                Strategy
            </div>
            <div className="list__cell list__cell--left">
                Owner
            </div>
            <div className="list__cell list__cell--left">
                Priority
            </div>
            <div className="list__cell list__cell--right">
                TVL
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
                {pool.validator_fee}
            </div>
            <div className="list__cell list__cell--left">
                {pool.strategy}
            </div>
            <div className="list__cell list__cell--left">
                {pool.owner}
            </div>
            <div className="list__cell list__cell--left">
                {pool.priority}
            </div>
            <div className="list__cell list__cell--right">
                {pool.tvl}
            </div>
        </div>
    )
}