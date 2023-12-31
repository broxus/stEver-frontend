import { type Address, type Transaction } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'
import { useRpcProvider } from '@broxus/js-core'

import { type StEverVaultDetails } from '@/abi/types'
import { FEE } from '@/config'

import { StEverTokenWallet, StEverTokenWalletRoot, stEverVaultContract } from './contracts'

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

    public static async _deposit(address: Address, sender: Address, depositAmount: string): Promise<Transaction> {
        const provider = useRpcProvider()
        const contract = stEverVaultContract(address, provider)
        const transaction = await contract.methods
            .deposit({
                _amount: depositAmount,
                _nonce: Date.now().toString(),
            })
            .send({
                from: sender,
                amount: new BigNumber(depositAmount).plus(FEE).toFixed(),
            })
        return transaction
    }

    public static async _encodeDepositPayload(address: Address): Promise<string> {
        const contract = stEverVaultContract(address)
        const { depositPayload } = await contract.methods
            .encodeDepositPayload({
                _nonce: Date.now().toString(),
            })
            .call()
        return depositPayload
    }

    public static async _getTokenWallet(address: Address, owner: Address): Promise<Address> {
        const contract = StEverTokenWalletRoot(address)
        const tokenWallet = await contract.methods.walletOf({
            answerId: 0,
            walletOwner: owner,
        }).call().then(r => r.value0)
        return tokenWallet
    }

    public static async _transfer(address: Address, sender: Address, params: {
        amount: string | number;
        recipient: Address;
        deployWalletValue: string | number;
        remainingGasTo: Address;
        notify: boolean;
        payload: string;
    }): Promise<Transaction> {
        const provider = useRpcProvider()
        const contract = StEverTokenWallet(address, provider)
        const transaction = await contract.methods
            .transfer(params)
            .send({
                from: sender,
                amount: new BigNumber(FEE).toFixed(),
            })
        return transaction
    }

}
