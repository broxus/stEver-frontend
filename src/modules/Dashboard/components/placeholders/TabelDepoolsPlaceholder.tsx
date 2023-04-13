import * as React from 'react'
import { Placeholder, Placeholder as PlaceholderBase } from '@/components/common/Placeholder';
import { makeArray } from '@broxus/js-utils';
import { getUniqueId } from 'everscale-inpage-provider/dist/utils';

type Props = {
    rowsCount?: number;
}

export function PoolsListPlaceholder({ rowsCount }: Props): JSX.Element {
    const placeholder = React.useRef(makeArray(rowsCount ?? 10, getUniqueId))
    return (
        <>
            <table className="uk-table uk-table-divider uk-width-1-1 table">
                <thead className="uk-height-small">
                    <tr>
                        <th className="uk-text-left uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                        <th className="uk-text-left uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                        <th className="uk-text-left uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                        <th className="uk-text-left uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                        <th className="uk-text-left uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                        <th className="uk-text-right uk-width-small">
                            <Placeholder height={20} width={100} />
                        </th>
                    </tr>
                </thead>
                {placeholder.current.map(key => (
                    <tbody key={key} className="uk-height-small">
                        <tr>
                            <td className="uk-text-left uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>
                            <td className="uk-text-left uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>

                            <td className="uk-text-left uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>
                            <td className="uk-text-left uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>

                            <td className="uk-text-left uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>
                            <td className="uk-text-right uk-width-small">
                                <Placeholder height={20} width={100} />
                            </td>
                        </tr>
                    </tbody>

                ))}
            </table>
        </>
    )
}
