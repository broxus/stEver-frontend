import * as React from 'react'
import {
    Button, Flex, Tabs, Tile,
} from '@broxus/react-uikit'
import { Observer, observer } from 'mobx-react-lite'

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
                            label: 'Stake',
                            key: `${StakingType.Stake}`,
                            children: <FormTab type={StakingType.Stake} staking={staking} />,
                        },
                        {
                            label: 'Unstake',
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
    return (
        <Flex flexDirection="column" justifyContent="between">
            <Observer>
                {() => (
                    <TextInput
                        autoFocus
                        placeholder="0"
                        value={staking.amount}
                        onChange={e => staking.setAmount(e)}
                        disabled={false}
                        maxValue={staking.maxAmount}
                        inputMode="numeric"
                        readOnly={false}
                        title={type === StakingType.Stake ? 'You spend EVER' : 'You receive stEVER'}
                        iconUrl={
                            type === StakingType.Stake ? CoinEverLogo : CoinStEverLogo
                        }
                        borderButtom
                    />
                )}
            </Observer>
            <Observer>
                {() => (
                    <TextInput
                        placeholder="0"
                        value={formatCurrency(convertCurrency(staking.getDepositStEverAmount, ST_EVER_DECIMALS))}
                        disabled={false}
                        inputMode="numeric"
                        readOnly
                        title={type === StakingType.Stake ? 'You receive stEVER' : 'You spend EVER'}
                        iconUrl={type === StakingType.Stake ? CoinStEverLogo : CoinEverLogo}
                        price={type === StakingType.Stake ? staking.exchangeRate : staking.exchangeRate}
                        currency={type === StakingType.Stake ? 'StEVER' : 'StEVER'}
                    />
                )}
            </Observer>
            <Button htmlType="submit" type="primary" className="uk-width-1-1">
                {type === StakingType.Stake ? 'Stake EVER' : 'Unstake EVER'}
            </Button>
        </Flex>
    )
}

export const FormStak = observer(FormStakInner)
