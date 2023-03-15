import * as React from 'react'
import './formStak.scss'
import { Button, Flex, Form, Grid, Tabs, Tile } from '@broxus/react-uikit'
import { AmountInput } from '@broxus/react-components'
import { TextInput } from '@/components/common/TextInput'

export function FormStak(): JSX.Element {
    return (
        <>
            <div className='form'>
                <Tile className='form__container uk-padding-remove'>
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
                </Tile>
            </div>
        </>
    )
}

function FormStakStake(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' justifyContent='between'>
                <TextInput placeholder='0' />
                <TextInput placeholder='0' />
                <Button type='default' className='uk-width-1-1' >
                    Stake EVER
                </Button>
            </Flex>
        </>
    )
}
function FormStakUnstake(): JSX.Element {
    return (
        <>
            <AmountInput />
            
            <AmountInput />
            <br/>
            <Button type='default'>
                Unstake EVER
            </Button>
        </>
    )
}