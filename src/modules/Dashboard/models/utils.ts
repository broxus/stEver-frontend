import { Address } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'
import { FEE } from '@/config'

import { StEverTokenWallet, StEverTokenWalletRoot, stEverVaultContract } from './contracts'
import { useRpcProvider } from '@broxus/js-core'

export abstract class StakingUtils {

    public static async _removePendingWithdraw(address: Address, sender: Address, nonce: number) {
        const contract = stEverVaultContract(address)
        await contract.methods.removePendingWithdraw({
            _nonce: nonce //nonce from withdraw request
        }).send({
            from: sender,
            amount: new BigNumber(FEE).toFixed(),
        })
    }


}
