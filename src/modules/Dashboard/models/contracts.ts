import { resolveTvmAddress, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'
import { TokenWalletUpgradeableAbi } from '@/abi/TokenWalletUpgradeable.abi'
import { TokenRootAbi } from '@/abi/TokenRoot.abi'
import { StEverAccountAbi } from '@/abi/StEverAccount.abi'


type VaultAbi = typeof StEverVaultAbi
type AccountAbi = typeof StEverAccountAbi

export function stEverVaultContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}

export function stEverAccountContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<AccountAbi> {
    return new provider.Contract(StEverAccountAbi, resolveTvmAddress(address))
}