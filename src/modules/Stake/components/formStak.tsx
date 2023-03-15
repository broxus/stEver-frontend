import * as React from 'react'
import './formStak.scss'
import { Button, Form, Tabs } from '@broxus/react-uikit'
import { AmountInput } from '@broxus/react-components'
import { TextInput } from '@/components/common/TextInput'

export function FormStak(): JSX.Element {
    return (
        <>
            <div className='form'>
                <div className='form__container'>
                    <Tabs
                        className='form__container--tabs'
                        defaultActiveKey="1"
                        items={[
                            {
                                label: 'Stake',
                                key: '1',
                                children: <FormStakStake />,
                            },
                            {
                                label: 'Unstake',
                                key: '3',
                                children: <FormStakUnstake />,
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}

function FormStakStake(): JSX.Element {
    return (
        <>
            <TextInput />
            <AmountInput />
            <Button type='default'>
                Stake EVER
            </Button>
        </>
    )
}
function FormStakUnstake(): JSX.Element {
    return (
        <>
            <AmountInput />
            <AmountInput />
            <Button type='default'>
                Unstake EVER
            </Button>
        </>
    )
}