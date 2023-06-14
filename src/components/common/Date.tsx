import * as React from 'react'
import classNames from 'classnames'

import { formatDate } from '@/utils'

import './Date.scss'

type Props = {
    time: number;
    line?: boolean;
}

export function Date({
    time,
    line,
}: Props): JSX.Element {
    return (
        <div
            className={classNames("root-date", line && "line")}
        >
            <time className={"title-date"}>
                {formatDate(time, 'HH:mm:ss')}
            </time>
            <time className={"main-date"}>
                {formatDate(time, 'MMM dd, yyyy')}
            </time>
        </div>
    )
}
