import { Address, Transaction } from 'everscale-inpage-provider'

import { StEverVaultDetails } from '@/abi/types'

import { StEverTokenWallet, stEverVaultContract } from './contracts'
import BigNumber from 'bignumber.js'
import { FEE } from '@/config'

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

    public static async _deposit(address: Address, depositAmount: string): Promise<Transaction> {
        const contract = stEverVaultContract(address)
        const transaction = await contract.methods
            .deposit({
                _amount: depositAmount,
                _nonce: Date.now().toString(),
            })
            .send({
                from: new Address("0:f8938c6b8ed47a4b2fb2c3f85054e899918a812724a3d9f84ccbf65016b20638"),
                amount: new BigNumber(depositAmount).plus(FEE).toFixed(),
            });
        return transaction
    }

    public static async _encodeDepositPayload(address: Address): Promise<string> {
        const contract = stEverVaultContract(address)
        const { depositPayload } = await contract.methods
            .encodeDepositPayload({
                _nonce: Date.now().toString(),
            })
            .call();
        return depositPayload
    }

    public static async _transfer(address: Address, params: {
        amount: string | number;
        recipient: Address;
        deployWalletValue: string | number;
        remainingGasTo: Address;
        notify: boolean;
        payload: string;
    }): Promise<Transaction> {
        const contract = StEverTokenWallet(address)
        const transaction = await contract.methods
            .transfer(params)
            .send({
                from: new Address("0:f8938c6b8ed47a4b2fb2c3f85054e899918a812724a3d9f84ccbf65016b20638"),
                amount: new BigNumber(params.amount).plus(FEE).toFixed(),
            });
        return transaction
    }
}