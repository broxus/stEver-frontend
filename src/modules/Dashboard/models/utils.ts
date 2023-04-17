import { Address } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'
import { FEE } from '@/config'
import { stEverVaultContract } from './contracts'

export abstract class DashboardUtils {
    public static async _removePendingWithdraw(address: Address, sender: Address, nonce: number) {
        const contract = stEverVaultContract(address)
        await contract.methods.removePendingWithdraw({
            _nonce: nonce
        }).send({
            from: sender,
            amount: new BigNumber(FEE).toFixed(),
        })
    }


}
