import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'
import { useStore } from '@/hooks/useStore'
import { debounce } from 'lodash'
import { abbreviateNumber, formattedAmount } from '@broxus/js-utils'
import { DateTime } from 'luxon'
import Media from 'react-media'
import { Chart } from '@broxus/react-components'

function ChartAPYInner(): JSX.Element {
    const seriesAPY = React.useRef<any>(null)
    const chartAPY = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    const onVisibleLogicalRangeChangeTvl: any = debounce(logicalRange => {
        if (logicalRange == null) {
            return
        }
        const barsInfo = seriesAPY.current?.api().barsInLogicalRange(logicalRange)
        if (
            barsInfo?.barsBefore !== undefined
            && Math.ceil(barsInfo.barsBefore) < 0
            && barsInfo?.from !== undefined
            && typeof barsInfo.from === 'number'
        ) {
            const from = (
                barsInfo.from + (
                    Math.ceil(barsInfo?.barsBefore) - 2
                ) * 86400
            )
            dashboard.getUsersAPYCharts({
                from,
                to: barsInfo.from,
            })
        }

    }, 50)

    function usdPriceFormatter(price: any): string {
        if (price < 1e-8 || price < 0) {
            return ''
        }
        if (price >= 1000) {
            const abbreviated = abbreviateNumber(price)
            const value = abbreviated.substring(0, abbreviated.length - 1)
            const unit = abbreviateNumber(price).slice(-1)
            return `${formattedAmount(value)}${unit}%`
        }
        return `${formattedAmount(price, undefined, {
            precision: 1,
        })}%`
    }


    React.useEffect(() => {
        const bs = (chartAPY.current?.timeScale().width() ?? 860) / 30
        chartAPY.current?.timeScale().applyOptions({
            barSpacing: bs,
            // minBarSpacing: bs,
        })

        chartAPY.current?.priceScale('right').applyOptions({
            scaleMargins: {
                bottom: 0.025,
                top: 0.1,
            },
        })
    }, [chartAPY.current])


    React.useEffect(() => {
        dashboard.getUsersAPYCharts({
            from: Math.floor(DateTime.local()
                .minus({
                    days: 30,
                })
                .toUTC(undefined, {
                    keepLocalTime: false,
                })
                .toSeconds()),

            to: Math.floor(DateTime.local()
                .toUTC(undefined, {
                    keepLocalTime: false,
                })
                .toSeconds()),
        })

    }, [])

    return (
        <Media query={{ minWidth: 640 }}>
            {matches => (
                <Observer>
                    {() => (
                        <Chart
                            height={400} width={1000} style={{ height: matches ? '100%' : '260px' }}
                            ref={chartAPY}
                            onVisibleLogicalRangeChange={onVisibleLogicalRangeChangeTvl}
                        >
                            {dashboard.isFetchingCharts && <Chart.Placeholder />}
                            <Chart.Series
                                ref={seriesAPY}
                                type="Area"
                                data={dashboard.apyCharts}
                                lineColor="#2B63F1"

                                priceFormat={{
                                    formatter: usdPriceFormatter,
                                    type: 'custom',
                                }}
                                priceScaleId="right"
                                lineType={0}
                            />
                        </Chart>
                    )}
                </Observer>
            )}
        </Media>
    )
}

export const ChartAPY = observer(ChartAPYInner)
