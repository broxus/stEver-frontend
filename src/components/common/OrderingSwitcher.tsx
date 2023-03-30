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
    positionLeft?: boolean
}


export function OrderingSwitcher<T>({
    ascending,
    column,
    children,
    value,
    descending,
    onSwitch,
    positionLeft
}: Props<any>): JSX.Element {
    const onClick = () => {
        console.log(value.direction)
        onSwitch?.({
            column,
            direction: value.direction === descending ? ascending : descending,
        })
    }

    return (
        <Link
            className={classNames('btn', 'ordering-switcher',
                positionLeft ?
                    {
                        'ordering-switcher-asc-left': value.column === column && value.direction === ascending,
                        'ordering-switcher-desc-left': value.column === column && value.direction === descending,
                    }
                    :
                    {
                        'ordering-switcher-asc': value.column === column && value.direction === ascending,
                        'ordering-switcher-desc': value.column === column && value.direction === descending,
                    }
            )}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}
