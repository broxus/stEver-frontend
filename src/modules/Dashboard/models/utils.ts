import { Address } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'
import { FEE } from '@/config'
import { stEverAccountContract, stEverVaultContract } from './contracts'

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

    public static async _getAccountAddress(address: Address, sender: Address) {
        const contract = stEverVaultContract(address)
        const { value0 } = await contract.methods.getAccountAddress({
            _user: sender,
            answerId: 0,
        }).call()
        return value0
    }

    public static async _withdrawRequests(address: Address) {
        const contract = stEverAccountContract(address)
        const { withdrawRequests } = await contract.methods.withdrawRequests().call()
        return withdrawRequests
    }

}
