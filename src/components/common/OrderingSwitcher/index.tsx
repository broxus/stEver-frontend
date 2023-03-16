import * as React from 'react'
import classNames from 'classnames'

import './index.scss'
import { Link } from '@broxus/react-uikit';


type Props<T> = {
    ascending: T;
    children: React.ReactNode;
    descending: T;
    value: T | undefined;
    onSwitch: (value: T) => void;
}


export function OrderingSwitcher<T>({
    ascending,
    children,
    value,
    descending,
    onSwitch,
}: Props<T>): JSX.Element {
    const onClick = () => {
        onSwitch?.(value === descending ? ascending : descending)
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
