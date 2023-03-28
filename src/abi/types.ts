import type { DecodedTransaction } from 'everscale-inpage-provider'

import { StEverVaultAbi } from './StEverVault.abi'
import { StEverAccountAbi } from './StEverAccount.abi'
import { StrategyDePoolAbi } from './StrategyDePool.abi'
import { DepoolStrategyFactoryAbi } from './DepoolStrategyFactory.abi'


export type StEverVaultDetails = DecodedTransaction<typeof StEverVaultAbi, 'getDetails'>['output']['value0']
export type DepositParams = DecodedTransaction<typeof StEverVaultAbi, 'deposit'>['input']
export type RemovePendingWithdrawParams = DecodedTransaction<typeof StEverVaultAbi, 'removePendingWithdraw'>['input']
export type WithdrawRequest = DecodedTransaction<typeof StEverAccountAbi, 'withdrawRequests'>['output']['withdrawRequests'][number]
export type StrategyDePool = DecodedTransaction<typeof StrategyDePoolAbi, 'getDetails'>['output']['value0']
export type GetDePoolInfo = DecodedTransaction<typeof DepoolStrategyFactoryAbi, 'getDePoolInfo'>['output']
export type GetRounds = DecodedTransaction<typeof DepoolStrategyFactoryAbi, 'getRounds'>['output']

