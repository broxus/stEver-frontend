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
    console.log(staking.amount)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                    items={[
                        {
                            label: 'Stake',
                            key: '1',
                            children: <FormStakStake />,
                        },
                        {
                            label: 'Unstake',
                            key: '2',
                            children: <FormStakUnstake />,
                        },
                    ]}
                />
            </Tile>
        </form>
    )
}

function FormStakStake(): JSX.Element {
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
                title="You spend EVER"
                iconUrl={CoinEverLogo}
                borderButtom={true}
            />
            <TextInput
                placeholder="0"
                value=""
                disabled={false}
                inputMode="numeric"
                readOnly
                title="You receive stEVER"
                iconUrl={CoinStEverLogo}
                price={"1,23"}
                currency={"EVER"}
            />
            <Button type="primary" className="uk-width-1-1">
                Stake EVER
            </Button>
        </Flex>
    )
}

function FormStakUnstake(): JSX.Element {
    return (
        <Flex flexDirection="column" justifyContent="between">
            <TextInput
                autoFocus
                placeholder="0"
                value=""
                disabled={false}
                inputMode="numeric"
                readOnly={false}
                title="You receive stEVER"
                iconUrl={CoinStEverLogo}
                borderButtom={true}
            />
            <TextInput
                placeholder="0"
                // value={staking.amount}
                // onChange={staking.setAmount}
                // onBlur={field.onBlur}
                disabled={false}
                inputMode="numeric"
                readOnly={true}
                title="You spend EVER"
                iconUrl={CoinEverLogo}
                price={"1,23"}
                currency={"StEVER"}
            />
            <Button type="default" className="uk-width-1-1">
                Unstake EVER
            </Button>
        </Flex>
    )
}

export const FormStak = observer(FormStakInner)
