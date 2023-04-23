import * as React from 'react'
import { debounce } from 'lodash'
import { DateTime } from 'luxon'
import Media from 'react-media'
import { Observer, observer } from 'mobx-react-lite'

import { Chart } from '@broxus/react-components'
import { abbreviateNumber, formattedAmount } from '@broxus/js-utils'

import { ChartStore } from '../../store/chartStore'
import { useStore } from '@/hooks/useStore'

function ChartTVLInner(): JSX.Element {
    const chartTvl = React.useRef<any>(null)
    const seriesTvl = React.useRef<any>(null)
    const dashboard = useStore(ChartStore)

    const onVisibleLogicalRangeChangeTvl: any = debounce(logicalRange => {
        console.log(logicalRange)
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
                    days: 200,
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
                            layout={{
                                textColor: "#8B909A",
                                fontSize: 12,
                                fontFamily: 'PT Root UI'
                            }}
                            rightPriceScale={{
                                borderColor: "#E4E5EA",
                                borderVisible: true,
                                scaleMargins: {
                                    bottom: 0.025,
                                    top: 0.1,
                                },
                            }}
                            timeScale={{
                                borderColor: "#E4E5EA",
                                borderVisible: true,
                                fixRightEdge: true,
                                rightBarStaysOnScroll: true,
                                timeVisible: true,
                                secondsVisible: true,
                            }}
                            crosshair={{
                                vertLine: {
                                    color: "#8B909A",
                                    style: 4,
                                    visible: true,
                                    width: 1,
                                },
                                horzLine: {
                                    color: "#8B909A",
                                    style: 4,
                                    visible: true,
                                    width: 1,
                                },
                            }}
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
            )
            }
        </Media >
    )
}

export const ChartTVL = observer(ChartTVLInner)
