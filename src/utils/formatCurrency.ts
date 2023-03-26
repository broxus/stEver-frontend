import BigNumber from 'bignumber.js'

export const formatCurrency = (amount: BigNumber.Value): string => {
    const d = new BigNumber(amount)

    if (d.isLessThan(1)) {
        return d.dp(8, BigNumber.ROUND_FLOOR).toFixed()
    }
    if (d.isLessThan(1000)) {
        return d.dp(4, BigNumber.ROUND_FLOOR).toFixed()
    }

    return d.toFixed(0, BigNumber.ROUND_FLOOR)
}
