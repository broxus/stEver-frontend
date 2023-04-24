import { type Address } from 'everscale-inpage-provider'

import { type GetDePoolInfo, type GetRounds, type StrategyDePool } from '@/abi/types'

import { StEverDePoolStrategy, StEverStrategyDePool } from './contracts'

export abstract class StrategyUtils {

    public static async _getStrategyDetails(address: Address): Promise<StrategyDePool> {
        const contract = StEverStrategyDePool(address)
        const { value0 } = await contract.methods.getDetails({ answerId: 0 }).call()

        return value0
    }

    public static async _getDePoolDetails(address: Address): Promise<GetDePoolInfo> {
        const contract = StEverDePoolStrategy(address)
        const data = await contract.methods.getDePoolInfo().call()
        return data
    }

    public static async _getRounds(address: Address): Promise<GetRounds> {
        const contract = StEverDePoolStrategy(address)
        const data = await contract.methods.getRounds().call()
        return data
    }

}
