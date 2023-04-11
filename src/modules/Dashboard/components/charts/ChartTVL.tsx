import { Chart } from '@broxus/react-components'
import { debounce } from 'lodash'
import { Observer, observer } from 'mobx-react-lite'
import * as React from 'react'
import { ChartStore } from '../../store/chartStore'
import { useStore } from '@/hooks/useStore'
import { DateTime } from 'luxon'
import { abbreviateNumber, formattedAmount } from '@broxus/js-utils'
import Media from 'react-media'

function ChartTVLInner(): JSX.Element {

    const chartTvl = React.useRef<any>(null)
    const seriesTvl = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)


    const onVisibleLogicalRangeChangeTvl: any = debounce(logicalRange => {
        if (logicalRange == null) {
            return
        }
        const barsInfo = seriesTvl.current?.api().barsInLogicalRange(logicalRange)
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
            dashboard.getUsersTvlCharts({
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
        return `${formattedAmount(price, undefined, {
            precision: 1,
        })}`
    }


    React.useEffect(() => {
        const bs = (chartTvl.current?.timeScale().width() ?? 860) / 30
        chartTvl.current?.timeScale().applyOptions({
            barSpacing: bs,
            // minBarSpacing: bs,
        })

        chartTvl.current?.priceScale('right').applyOptions({
            scaleMargins: {
                bottom: 0.025,
                top: 0.1,
            },
        })
    }, [chartTvl.current])


    React.useEffect(() => {
        dashboard.getUsersTvlCharts({
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
                            ref={chartTvl}
                            onVisibleLogicalRangeChange={onVisibleLogicalRangeChangeTvl}
                        >
                            {dashboard.isFetchingCharts && <Chart.Placeholder />}
                            <Chart.Series
                                ref={seriesTvl}
                                type="Area"
                                data={dashboard.tvlCharts}
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

export const ChartTVL = observer(ChartTVLInner)
