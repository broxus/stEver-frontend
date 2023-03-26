import BigNumber from 'bignumber.js'

import { multiplier } from './multiplier'

export const parseCurrency = (
    amount: string,
    decimals: number,
) => new BigNumber(amount).times(multiplier(decimals)).toFixed(0, BigNumber.ROUND_DOWN)
