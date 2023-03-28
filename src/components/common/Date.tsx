import * as React from 'react'
import classNames from 'classnames'

import { formatDate } from '@/utils'

import styles from './Date.module.scss'

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
            className={classNames(styles.root, {
                [styles.line]: line,
            })}
        >
            <time className={styles.title}>
                {formatDate(time, 'HH:mm:ss')}
            </time>
            <time className={styles.main}>
                {formatDate(time, 'MMM dd, yyyy')}
            </time>
        </div>
    )
}
