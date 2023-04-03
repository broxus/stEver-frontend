import * as React from 'react'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'

import { formattedAmount } from '@/utils/formatted-amount'

import './RateChange.scss'

type RateChangeProps = {
    className?: string;
    displayPercents?: boolean;
    size?: 'sm';
    value: string;
    currency?: string;
}

function getDirection(value: BigNumber.Value): number {
    const val = new BigNumber(value ?? 0)
    if (val.lt(0)) {
        return -1
    }
    if (val.gt(0)) {
        return 1
    }
    return 0
}


export function RateChange({
    className,
    displayPercents = true,
    size,
    value,
    currency = "%"
}: RateChangeProps): JSX.Element {
    const dir = getDirection(value)
    return (
        <div
            className={classNames('rate-change', className, {
                'rate-change-down': dir < 0,
                'rate-change-up': dir > 0,
                [`rate-change-${size}`]: size !== undefined,
            })}
        >
            {formattedAmount(value, undefined, { preserve: true })}
            {displayPercents && currency}
        </div>
    )
}
