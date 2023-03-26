import { resolveTvmAddress, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'

type VaultAbi = typeof StEverVaultAbi

export function stEverVaultContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}
