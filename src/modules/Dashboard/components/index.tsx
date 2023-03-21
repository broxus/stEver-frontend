import * as React from 'react'

import { ChartDashboard } from './ChartDashboard'
import { TabelDepoolsDashboard } from './TabelDepoolsDashboard'
import { TabelTransactionsDashboard } from './TabelTransactionsDashboard'

import './index.scss'
import { TabelWithdrawDashboard } from './TabelWithdrawDashboard'

export function Dashboard(): JSX.Element {
    return (
        <div className="container container--large dashboard">
            <ChartDashboard />
            <TabelDepoolsDashboard />
            <TabelTransactionsDashboard />
            <TabelWithdrawDashboard />
        </div>
    )
}
