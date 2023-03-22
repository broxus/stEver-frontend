import { resolveTvmAddress, useRpcClient } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'

type VaultAbi = typeof StEverVaultAbi

export function stEverVaultContract(
    address: Address,
    provider = useRpcClient(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}
