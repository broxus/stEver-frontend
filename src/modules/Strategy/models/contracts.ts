import { resolveTvmAddress, useRpcProvider } from '@broxus/js-core'
import { Address, Contract } from 'everscale-inpage-provider'

import { StrategyDePoolAbi } from '@/abi/StrategyDePool.abi'
import { DepoolStrategyFactoryAbi } from '@/abi/DepoolStrategyFactory.abi'

type StrategyDePool = typeof StrategyDePoolAbi
type DepoolStrategyFactory = typeof DepoolStrategyFactoryAbi

export function StEverStrategyDePool(
    address: Address,
    provider = useRpcProvider(),
): Contract<StrategyDePool> {
    return new provider.Contract(StrategyDePoolAbi, resolveTvmAddress(address))
}

export function StEverDePoolStrategy(
    address: Address,
    provider = useRpcProvider(),
): Contract<DepoolStrategyFactory> {
    return new provider.Contract(DepoolStrategyFactoryAbi, resolveTvmAddress(address))
}
