import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'

function ChartPriceInner(): JSX.Element {
    const seriesPrice = React.useRef<any>(null)
    const chartPrice = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    return (
        <>
        
        </>
    )
}

export const ChartDashboard = observer(ChartPriceInner)
