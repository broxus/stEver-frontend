import { Address } from 'everscale-inpage-provider'

import { StEverVaultDetails } from '@/abi/types'

import { stEverVaultContract } from './contracts'

export abstract class StakingUtils {

    public static async _getStakeDetails(address: Address): Promise<StEverVaultDetails> {
        const contract = stEverVaultContract(address)
        const { value0 } = await contract.methods.getDetails({ answerId: 0 }).call()
        return value0
    }

    public static async _getDepositStEverAmount(address: Address, amount: string): Promise<string> {
        const contract = stEverVaultContract(address)
        const { value0 } = await contract.methods.getDepositStEverAmount({ _amount: amount }).call()
        return value0
    }

    public static async _getWithdrawEverAmount(address: Address, amount: string): Promise<string> {
        const contract = stEverVaultContract(address)
        const { value0 } = await contract.methods.getWithdrawEverAmount({ _amount: amount }).call()
        return value0
    }

    public static async _encodeDepositPayload(address: Address): Promise<string> {
        const contract = stEverVaultContract(address)
        const { depositPayload } = await contract.methods.encodeDepositPayload({
            _nonce: Date.now().toString(),
        }).call()
        return depositPayload
    }

}
