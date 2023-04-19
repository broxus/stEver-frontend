import { resolveTvmAddress, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'
import { TokenWalletUpgradeableAbi } from '@/abi/TokenWalletUpgradeable.abi'
import { TokenRootAbi } from '@/abi/TokenRoot.abi'

type VaultAbi = typeof StEverVaultAbi
type RootAbi = typeof TokenRootAbi
type WalletUpgradeableAbi = typeof TokenWalletUpgradeableAbi


export function stEverVaultContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}

export function stEverAccountContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}