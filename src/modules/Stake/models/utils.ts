import { Address } from 'everscale-inpage-provider'

import { StEverVaultDetails } from '@/abi/types'

import { stEverVaultContract } from './contracts'

export abstract class StakingUtils {

    public static async _getStakeDetails(address: Address): Promise<StEverVaultDetails> {
        const contract = stEverVaultContract(address)

        const { value0 } = await contract.methods.getDetails({ answerId: 0 }).call()
        const depositAmount = 1000000000 //1 ever
        await contract.methods
            .deposit({
                _amount: depositAmount,
                _nonce: Date.now().toString(),
            })
            .send({
                from: new Address("0:f8938c6b8ed47a4b2fb2c3f85054e899918a812724a3d9f84ccbf65016b20638"),
                amount: "1000000000",
            });
            
        // const { depositPayload } = await contract.methods.encodeDepositPayload({
        //     _nonce: Date.now().toString(),
        // }).call()
        
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
