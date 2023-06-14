import * as React from 'react'
import {
    Button,
    Flex, Heading, Text, Tile, Width,
} from '@broxus/react-uikit'

import './InfoStak.scss'
import { Observer, observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'
import { FormattedTokenAmount } from '@broxus/react-components'
import Media from 'react-media'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useTvmWalletContext } from '@broxus/react-modules'
import { formattedTokenAmount } from '@broxus/js-utils'

import { appRoutes } from '@/routes'
import { MyWithdrawStore } from '@/modules/Dashboard/store/myWithdrawStore'
import { UsersWithdrawalsStatus } from '@/apiClientCodegen'
import { Placeholder } from '@/components/common/Placeholder'
import { ST_EVER_DECIMALS } from '@/config'
import { useStore } from '@/hooks/useStore'

import { StakingStore } from '../store/stakingStore'

export function InfoStakInner(): JSX.Element {
    const staking = useStore(StakingStore)
    const intl = useIntl()
    const history = useHistory()
    const myWithdraw = useStore(MyWithdrawStore)
    const wallet = useTvmWalletContext()

    React.useEffect(() => {
        if (wallet.isConnected) {
            myWithdraw.getTransactions({
                limit: myWithdraw.pagination.limit,
                offset: myWithdraw.pagination.currentPage * myWithdraw.pagination.limit,
                ordering: myWithdraw.ordering,
                userAddress: wallet.address?.toString(),
                statuses: [UsersWithdrawalsStatus.PENDING],
                amountGe: undefined,
                amountLe: undefined,
            })
        }
    }, [wallet.isConnected])

    return (
        <Observer>
            {() => (
                <>
                    <Flex flexDirection="column" justifyContent="center">
                        <Flex justifyContent="center" className="uk-margin-bottom">
                            <Heading component="h1">
                                {intl.formatMessage({
                                    id: 'STAKE_YOUR_EVERS',
                                })}
                            </Heading>
                        </Flex>

                        <Media query={{ minWidth: 640 }}>
                            <Flex justifyContent="center" className="border">
                                <Tile className="uk-padding-remove">
                                    <Text component="h4" className="uk-text-center uk-margin-remove">
                                        {staking?.isFetching
                                            ? <Placeholder height={30} width={100} />
                                            : (
                                                <FormattedTokenAmount
                                                    decimals={ST_EVER_DECIMALS}
                                                    value={staking?.strategyMainInfo?.tvl}
                                                />
                                            )}

                                    </Text>
                                    <Text className="uk-text-center uk-margin-remove">
                                        {intl.formatMessage({
                                            id: 'EVER_STAKED',
                                        })} 
                                    </Text>
                                </Tile>
                                <Tile className="uk-padding-remove">
                                    <Text component="h4" className="uk-text-center uk-margin-remove">
                                        {staking?.isFetching
                                            ? <Placeholder height={30} width={100} />
                                            : (
                                                <>
                                                    {new BigNumber(staking?.strategyMainInfo?.apy ?? 0).times(100).toFixed(2)}
                                                    {' '}
                                                    %
                                                </>
                                            )}
                                    </Text>
                                    <Text className="uk-text-center uk-margin-remove">
                                        {intl.formatMessage({
                                            id: 'AVERAGE_APY',
                                        })}
                                    </Text>
                                </Tile>
                                <Tile className="uk-padding-remove">
                                    <Text component="h4" className="uk-text-center uk-margin-remove">
                                        {staking?.isFetching
                                            ? <Placeholder height={30} width={100} />
                                            : (
                                                <>
                                                    {staking?.strategyMainInfo?.holders ?? 0}
                                                </>
                                            )}
                                    </Text>
                                    <Text className="uk-text-center uk-margin-remove">
                                        {intl.formatMessage({
                                            id: 'HOLDERS',
                                        })}
                                    </Text>
                                </Tile>
                            </Flex>
                        </Media>
                    </Flex>
                    {myWithdraw.userSum && myWithdraw.userSum !== '0' ? (
                        <Tile type="muted">
                            <Width size="1-1">
                                <Text component="h5" align="center">
                                    Your
                                    {' '}
                                    {formattedTokenAmount(
                                        myWithdraw.userSum,
                                        ST_EVER_DECIMALS,
                                    )}
                                    {' '}
                                    {intl.formatMessage({
                                        id: 'YOUR_STAKED_TOTAL',
                                    })}

                                </Text>
                                <Flex justifyContent="center">
                                    <Button
                                        onClick={() => history.push(appRoutes.dashboard.path)}
                                        type="text"
                                    >
                                        {intl.formatMessage({
                                            id: 'TRANSACTIONS',
                                        })}
                                    </Button>
                                    <Button type="tertiary" href='https://docs.stakedever.io/overview/about-stever' target="_blank">
                                        {intl.formatMessage({
                                            id: 'MANUAL',
                                        })}
                                    </Button>
                                </Flex>
                            </Width>
                        </Tile>
                    )
                        : undefined}
                </>
            )}

        </Observer>

    )
}

export const InfoStak = observer(InfoStakInner)
