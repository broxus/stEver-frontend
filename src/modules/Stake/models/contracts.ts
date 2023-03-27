import { resolveTvmAddress, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StEverVaultAbi } from '@/abi/StEverVault.abi'
import { TokenWalletUpgradeableAbi } from '@/abi/TokenWalletUpgradeable.abi'

type VaultAbi = typeof StEverVaultAbi
type WalletUpgradeableAbi = typeof TokenWalletUpgradeableAbi

export function stEverVaultContract(
    address: Address,
    provider = useRpcProvider(),
): Contract<VaultAbi> {
    return new provider.Contract(StEverVaultAbi, resolveTvmAddress(address))
}

export function StEverTokenWallet(
    address: Address,
    provider = useRpcProvider(),
): Contract<WalletUpgradeableAbi> {
    return new provider.Contract(TokenWalletUpgradeableAbi, resolveTvmAddress(address))
}
