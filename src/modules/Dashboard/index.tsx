import * as React from 'react'
import { ChartDashboard } from '@/modules/Dashboard/components/chartDashboard'
import { TabelDepoolsDashboard } from '@/modules/Dashboard/components/tabelDepoolsDashboard'
import { TabelTransactionsDashboard } from '@/modules/Dashboard/components/tabelTransactionsDashboard'
import styles from './index.module.scss'

export function Dashboard(): JSX.Element {
    return (
        <>
            <ChartDashboard />
            <TabelDepoolsDashboard />
            <TabelTransactionsDashboard />
        </>
    )
}
