import * as React from 'react'
import { useIntl } from 'react-intl'

import { useDownload, useCsv } from '@/utils'

import './DownloadCsv.scss'
import { Link } from '@broxus/react-uikit'

type Props = {
    items?: any[];
    keys: string[];
    filename: string;
}

export function DownloadCsv({
    items = [],
    keys,
    filename,
}: Props): JSX.Element {
    const intl = useIntl()
    const header = keys.map(id => intl.formatMessage({ id }))
    const csv = useCsv(header, items)
    const download = useDownload(csv, filename, 'text/csv')

    return (
        <Link className="uk-margin-auto-vertical downloadCsv" onClick={download}>
            {intl.formatMessage({
                id: 'EXPORT',
            })}
        </Link>
    )
}
