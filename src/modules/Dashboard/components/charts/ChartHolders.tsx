import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'

function ChartHoldersInner(): JSX.Element {
    const seriesHolders = React.useRef<any>(null)
    const chartHolders = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    return (
        <>
        
        </>
    )
}

export const ChartDashboard = observer(ChartHoldersInner)
