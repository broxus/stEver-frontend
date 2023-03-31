import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'
import { useStore } from '@/hooks/useStore'

function ChartAPYInner(): JSX.Element {
    const seriesAPY = React.useRef<any>(null)
    const chartAPY = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    return (
        <>
        
        </>
    )
}

export const ChartDashboard = observer(ChartAPYInner)
