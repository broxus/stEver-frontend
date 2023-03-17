import * as React from 'react'

import { useProvider } from '@/hooks/useStore'
import { StakingStore } from '@/modules/Stake/store/stakingStore'
import { Stak } from '@/modules/Stake/components'

export default function StakPage(): JSX.Element {
    const StakingProvider = useProvider(StakingStore)

    return (
        <StakingProvider>
            <Stak />
        </StakingProvider>
    )
}
