import { useStore } from '@/hooks/useStore'
import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'
import { debounce } from 'lodash'
import { abbreviateNumber, formattedAmount } from '@broxus/js-utils'
import { DateTime } from 'luxon'
import Media from 'react-media'
import { Chart } from '@broxus/react-components'

function ChartPriceInner(): JSX.Element {
    const seriesPrice = React.useRef<any>(null)
    const chartPrice = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    const onVisibleLogicalRangeChangeTvl: any = debounce(logicalRange => {
        if (logicalRange == null) {
            return
        }
        const barsInfo = seriesPrice.current?.api().barsInLogicalRange(logicalRange)
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
            dashboard.getUsersPriceCharts({
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
            return `${formattedAmount(value)}${unit}`
        }
        return price
    }


    React.useEffect(() => {
        const bs = (chartPrice.current?.timeScale().width() ?? 860) / 30
        chartPrice.current?.timeScale().applyOptions({
            barSpacing: bs,
            // minBarSpacing: bs,
        })

        chartPrice.current?.priceScale('right').applyOptions({
            scaleMargins: {
                bottom: 0.025,
                top: 0.1,
            },
        })
    }, [chartPrice.current])


    React.useEffect(() => {
        dashboard.getUsersPriceCharts({
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
                            ref={chartPrice}
                            onVisibleLogicalRangeChange={onVisibleLogicalRangeChangeTvl}
                        >
                            {dashboard.isFetchingCharts && <Chart.Placeholder />}
                            <Chart.Series
                                ref={seriesPrice}
                                type="Area"
                                data={dashboard.priceCharts}
                                lineColor="#2B63F1"
                                title={"EVER"}
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

export const ChartPrice = observer(ChartPriceInner)
