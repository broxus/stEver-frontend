import * as React from 'react'

import { useProvider } from '@/hooks/useStore'
import { StakingStore } from '@/modules/Stake/store/stakingStore'
import { Stak } from '@/modules/Stake/components'
import { useTvmWallet } from '@/utils'
import { MyWithdrawStore } from '@/modules/Dashboard/store/myWithdrawStore'


export default function StakPage(): JSX.Element {

    const wallet = useTvmWallet()
    const StakingProvider = useProvider(StakingStore, wallet)
    const MyWithdrawProvider = useProvider(MyWithdrawStore, wallet)


    return (
        <MyWithdrawProvider>
            <StakingProvider>
                <Stak />
            </StakingProvider>
        </MyWithdrawProvider>
    )
}
