import * as React from 'react'
import {
    Button, Flex, Tabs, Tile,
} from '@broxus/react-uikit'

import { TextInput } from '@/components/common/TextInput'

import './FormStak.scss'
import { useStore } from '@/hooks/useStore'
import { StakingStore, StakingType } from '@/modules/Stake/store/stakingStore'
import { useAmountField } from '@/hooks/useAmountField'
import CoinEverLogo from '@/assets/icons/EVER.svg'
import CoinStEverLogo from '@/assets/icons/StEVER.svg'
import { observer } from 'mobx-react-lite'


function FormStakInner(): JSX.Element {
    const staking = useStore(StakingStore)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        staking.submit()
        e.preventDefault()
    }

    const onChangeTabs = (e: StakingType) => {
        staking.setType(e)
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
                    //@ts-ignore
                    onChange={onChangeTabs}
                    items={[
                        {
                            label: 'Stake',
                            key: `${StakingType[0]}`,
                            children: <FormStakStake type={StakingType.Stake} />,
                        },
                        {
                            label: 'Unstake',
                            key: `${StakingType[1]}`,
                            children: <FormStakStake type={StakingType.Unstake} />,
                        },
                    ]}
                />
            </Tile>
        </form>
    )
}

function FormStakStake({
    type
}: {
    type: StakingType
}): JSX.Element {

    const staking = useStore(StakingStore)
    const field = useAmountField({
        onBlur: staking.setAmount,
        onChange: staking.setAmount,
    })
 
    return (

        <Flex flexDirection="column" justifyContent="between">
            <TextInput
                autoFocus
                placeholder="0"
                value={staking.amount}
                onChange={staking.setAmount}
                onBlur={field.onBlur}
                disabled={false}
                inputMode="numeric"
                readOnly={false}
                title={type === StakingType.Stake ? "You spend EVER" : "You receive stEVER"}
                iconUrl={
                    type === StakingType.Stake ? CoinEverLogo : CoinStEverLogo
                }
                borderButtom={true}
            />
            <TextInput
                placeholder="0"
                value={staking.getAmount}
                disabled={false}
                inputMode="numeric"
                readOnly
                title={type === StakingType.Stake ? "You receive stEVER" : "You spend EVER"}
                iconUrl={type === StakingType.Stake ? CoinStEverLogo : CoinEverLogo}
                price={type === StakingType.Stake ? staking.exchangeRate : "0.9"}
                currency={type === StakingType.Stake ? "StEVER" : "StEVER"}
            />
            <Button type="primary" className="uk-width-1-1">
                {type === StakingType.Stake ? "Stake EVER" : "Unstake EVER"}
            </Button>
        </Flex>
    )
}

export const FormStak = observer(FormStakInner)
