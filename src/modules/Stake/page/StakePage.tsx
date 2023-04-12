import * as React from 'react'

import { useProvider } from '@/hooks/useStore'
import { StakingStore } from '@/modules/Stake/store/stakingStore'
import { Stak } from '@/modules/Stake/components'
import { useTvmWallet } from '@/utils'


export default function StakPage(): JSX.Element {

    const wallet = useTvmWallet()
    const StakingProvider = useProvider(StakingStore, wallet)

    return (
        <StakingProvider>
            <Stak />
        </StakingProvider>
    )
}
