import * as React from 'react'
import styles from './tabelDepoolsDashboard.module.scss'
import classNames from 'classnames'
import Media from 'react-media'
import { Flex, Heading, Link, Tile } from '@broxus/react-uikit'

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
                <Heading component='h4'>
                    Participating depools
                </Heading>
                <Tile type='default' size='xsmall'>
                    <table className="uk-table uk-table-divider uk-width-1-1 table">
                        <Media query={{ minWidth: 640 }}>
                            <DepoolsListHeader />
                        </Media>
                        {depools.map((pool, idx) => (
                            <Media key={pool.depool} query={{ minWidth: 640 }}>
                                <DepoolsListItem
                                    key={pool.depool}
                                    idx={idx + 1}
                                    pool={pool}
                                />
                            </Media>
                        ))}
                    </table>
                </Tile>
            </Flex>
        </>
    )
}

export function DepoolsListHeader(): JSX.Element {
    return (
        <thead className='uk-height-small'>
            <tr>
                <th className='uk-text-left'>Depool</th>
                <th className='uk-text-left'>Validator fee</th>
                <th className='uk-text-left'>Strategy</th>
                <th className='uk-text-left'>Owner</th>
                <th className='uk-text-left'>Priority</th>
                <th className='uk-text-right'>TVL</th>
            </tr>
        </thead>
    )
}

type Props = {
    idx: number;
    pool: any;
}

export function DepoolsListItem({ idx, pool }: Props): JSX.Element {
    return (
        <>
            <tbody className='uk-height-small'>
                <tr>
                    <td className='uk-text-left'><Link>{pool.depool}</Link></td>
                    <td className='uk-text-left'>{pool.validator_fee}</td>
                    <td className='uk-text-left'><Link>{pool.strategy}</Link></td>
                    <td className='uk-text-left'><Link>{pool.owner}</Link></td>
                    <td className='uk-text-left'>{pool.priority}</td>
                    <td className='uk-text-right'>{pool.tvl}</td>
                </tr>
            </tbody>
        </>
    )
}