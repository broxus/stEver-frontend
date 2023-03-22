import * as React from 'react'

import { useProvider } from '@/hooks/useStore'

import { Dashboard } from '../components'
import { DashboardStore } from '../store/dashboardStore'

export default function DashboardPage(): JSX.Element {

    const DashboardProvider = useProvider(DashboardStore)

    return (
        <DashboardProvider>
            <Dashboard />
        </DashboardProvider>
    )
}
