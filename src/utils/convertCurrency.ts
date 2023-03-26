import BigNumber from 'bignumber.js'

import { multiplier } from './multiplier'

export const convertCurrency = (amount: string | undefined, decimals: number) => new BigNumber(amount || '0').div(multiplier(decimals)).toFixed()
