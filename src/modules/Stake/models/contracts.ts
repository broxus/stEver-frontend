import { resolveTvmAddress, useRpcClient } from '@broxus/js-core'
import { type Address, type Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'
import { TokenWalletUpgradeableAbi } from '@/abi/TokenWalletUpgradeable.abi'
import { TokenRootAbi } from '@/abi/TokenRoot.abi'

type VaultAbi = typeof StEverVaultAbi
type RootAbi = typeof TokenRootAbi
type WalletUpgradeableAbi = typeof TokenWalletUpgradeableAbi

export function stEverVaultContract(
    address: Address,
    provider = useRpcClient(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}

export function StEverTokenWalletRoot(
    address: Address,
    provider = useRpcClient(),
): Contract<RootAbi> {
    return new provider.Contract(TokenRootAbi, resolveTvmAddress(address))
}

export function StEverTokenWallet(
    address: Address,
    provider = useRpcClient(),
): Contract<WalletUpgradeableAbi> {
    return new provider.Contract(TokenWalletUpgradeableAbi, resolveTvmAddress(address))
}
