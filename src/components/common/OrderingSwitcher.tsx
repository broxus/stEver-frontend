import * as React from 'react'
import classNames from 'classnames'
import { Link } from '@broxus/react-uikit'

import './OrderingSwitcher.scss'

type Props<T> = {
    ascending: T;
    column: string;
    children: React.ReactNode;
    descending: T;
    value: T | undefined;
    onSwitch: (value: T) => void;
}


export function OrderingSwitcher<T>({
    ascending,
    column,
    children,
    value,
    descending,
    onSwitch,
}: Props<any>): JSX.Element {
    const onClick = () => {
        onSwitch?.({
            column: column,
            direction: value === descending ? ascending : descending
        })
    }

    return (
        <Link
            className={classNames('ordering-switcher', {
                'ordering-switcher-asc': value === ascending,
                'ordering-switcher-desc': value === descending,
            })}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}
