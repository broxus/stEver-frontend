import BigNumber from 'bignumber.js'

export const multiplier = (decimals: number) => new BigNumber(10).pow(decimals)
