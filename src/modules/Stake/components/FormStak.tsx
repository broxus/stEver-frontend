import * as React from 'react'
import {
    Button, Flex, Tabs, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'
import { useTvmWalletContext } from '@broxus/react-modules'
import Media from 'react-media'
import { useIntl } from 'react-intl'

import { TextInput } from '@/components/common/TextInput'

import './FormStak.scss'
import { useStore } from '@/hooks/useStore'
import { StakingStore, StakingType } from '@/modules/Stake/store/stakingStore'
import CoinEverLogo from '@/assets/icons/EVER.svg'
import CoinStEverLogo from '@/assets/icons/StEVER.svg'
import { formatCurrency } from '@/utils/formatCurrency'
import { convertCurrency } from '@/utils/convertCurrency'
import { ST_EVER_DECIMALS } from '@/config'


function FormStakInner(): JSX.Element {
    const staking = useStore(StakingStore)
    const intl = useIntl()
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        staking.submit()
        e.preventDefault()
    }

    return (
        <form
            onSubmit={onSubmit}
            className="form"
        >
            <Tile className="form__container uk-padding-remove">
                <Tabs
                    className="form__container--tabs"
                    defaultActiveKey="1"
                    // @ts-ignore
                    onChange={e => staking.setType(e)}
                    items={[
                        {
                            label: intl.formatMessage({
                                id: 'STAKE',
                            }),
                            key: `${StakingType.Stake}`,
                            children: <FormTab type={StakingType.Stake} staking={staking} />,
                        },
                        {
                            label: intl.formatMessage({
                                id: 'UNSTAKE',
                            }),
                            key: `${StakingType.Unstake}`,
                            children: <FormTab type={StakingType.Unstake} staking={staking} />,
                        },
                    ]}
                />
            </Tile>
        </form>
    )
}

type FormTabType = {
    type: StakingType;
    staking: StakingStore
}

function FormTab({
    type,
    staking,
}: FormTabType): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()
    return (
        <Flex flexDirection="column" justifyContent="between">

            <Media query={{ minWidth: 768 }}>
                {match => (
                    <Observer>
                        {() => (
                            <TextInput
                                autoFocus
                                placeholder="0"
                                value={staking.amount}
                                onChange={e => staking.setAmount(e)}
                                maxValue={staking.maxAmount}
                                inputMode="numeric"
                                readOnly={false}
                                title={type === StakingType.Stake
                                    ? intl.formatMessage({
                                        id: 'YOU_SPEND_EVER',
                                    })
                                    : intl.formatMessage({
                                        id: 'YOU_SPEND_STEVER',
                                    })}
                                iconUrl={
                                    type === StakingType.Stake ? CoinEverLogo : CoinStEverLogo
                                }
                                borderButtom
                                showMaxButton={match && wallet.isConnected}
                            />
                        )}
                    </Observer>
                )}
            </Media>


            <Observer>
                {() => (
                    <>
                        <TextInput
                            placeholder="0"
                            value={formatCurrency(convertCurrency(staking.getDepositStEverAmount, ST_EVER_DECIMALS))}
                            disabled={false}
                            inputMode="numeric"
                            readOnly
                            title={type === StakingType.Stake
                                ? intl.formatMessage({
                                    id: 'YOU_RECEIVE_STEVER',
                                })
                                : intl.formatMessage({
                                    id: 'YOU_RECEIVE_EVER',
                                })}
                            iconUrl={type === StakingType.Stake ? CoinStEverLogo : CoinEverLogo}
                            price={type === StakingType.Stake ? staking.exchangeRate ?? '0' : staking.exchangeRate ?? '0'}
                            currency={type === StakingType.Stake ? 'StEVER' : 'StEVER'}
                        />
                        {staking?.isFetchingForm
                            ? (
                                <Button disabled={staking?.isFetchingForm} type="primary" className="uk-width-1-1">
                                    {intl.formatMessage({
                                        id: 'LOADING',
                                    })}
                                </Button>
                            )
                            : (
                                <Button
                                    htmlType="submit"
                                    disabled={
                                        !wallet.isConnected
                                    || !staking.amount
                                    || staking.amount === '0'
                                    || +staking.amount > +staking.maxAmount
                                    }
                                    type="primary"
                                    className="uk-width-1-1"
                                >
                                    {type === StakingType.Stake
                                        ? `${intl.formatMessage({
                                            id: 'STAKE',
                                        })} EVER`
                                        : `${intl.formatMessage({
                                            id: 'UNSTAKE',
                                        })} EVER`}
                                </Button>
                            )}
                    </>
                )}
            </Observer>
        </Flex>
    )
}

export const FormStak = observer(FormStakInner)
