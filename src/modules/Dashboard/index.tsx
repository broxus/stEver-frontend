import * as React from 'react'

import { ChartDashboard } from '@/modules/Dashboard/components/chartDashboard'
import { TabelDepoolsDashboard } from '@/modules/Dashboard/components/tabelDepoolsDashboard'
import { TabelTransactionsDashboard } from '@/modules/Dashboard/components/tabelTransactionsDashboard'

import './index.scss'

export function Dashboard(): JSX.Element {
    return (
        <div className="container container--large dashboard">
            <ChartDashboard />
            <TabelDepoolsDashboard />
            <TabelTransactionsDashboard />
        </div>
    )
}
