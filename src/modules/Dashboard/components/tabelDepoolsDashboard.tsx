import * as React from 'react'
import Media from 'react-media'
import {
    Flex, Heading, Link, Tile,
} from '@broxus/react-uikit'

import { Pagination } from '@/components/common/Pagination'
import { OrderingSwitcher } from '@/components/common/OrderingSwitcher'

const depools = [
    {
        depool: '0:5iHe...8ob3',
        validator_fee: '4.2%',
        strategy: '0:5b8...f90',
        owner: '0:5b8...f90',
        priority: 'High',
        tvl: 1021000,
    },
    {
        depool: '0:5iHe...8ob3',
        validator_fee: '4.2%',
        strategy: '0:5b8...f90',
        owner: '0:5b8...f90',
        priority: 'High',
        tvl: 1021000,
    },
]
export function TabelDepoolsDashboard(): JSX.Element {
    return (
        <Flex flexDirection="column">
            <Heading component="h4">
                Participating depools
            </Heading>
            <Tile type="default" size="xsmall">
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
                <DepoolsListPagination />
            </Tile>
        </Flex>
    )
}

export function DepoolsListHeader(): JSX.Element {
    const onSwitchOrdering = async (value: any) => {
        alert('onSwitchOrdering')
    }

    return (
        <thead className="uk-height-small">
            <tr>
                <th className="uk-text-left">Depool</th>
                <th className="uk-text-left">
                    <OrderingSwitcher<any>
                        ascending={1}
                        descending={1}
                        value={1}
                        onSwitch={onSwitchOrdering}
                    >
                        Validator fee
                    </OrderingSwitcher>
                </th>
                <th className="uk-text-left">Strategy</th>
                <th className="uk-text-left">Owner</th>
                <th className="uk-text-left">Priority</th>
                <th className="uk-text-right">
                    TVL
                </th>
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
        <tbody className="uk-height-small">
            <tr>
                <td className="uk-text-left"><Link>{pool.depool}</Link></td>
                <td className="uk-text-left">{pool.validator_fee}</td>
                <td className="uk-text-left"><Link>{pool.strategy}</Link></td>
                <td className="uk-text-left"><Link>{pool.owner}</Link></td>
                <td className="uk-text-left">{pool.priority}</td>
                <td className="uk-text-right">{pool.tvl}</td>
            </tr>
        </tbody>
    )
}


export function DepoolsListPagination(): JSX.Element {

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
