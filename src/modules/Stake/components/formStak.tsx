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
                                key: '2',
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
                <TextInput
                    placeholder='0'
                    value=''
                    disabled={false}
                    inputMode='numeric'
                    readOnly={false}
                    title='You spend EVER'
                    iconUrl='https://app.flatqube.io/assets/992f1244bd3cbc67afa8.svg'
                />
                <br />
                <TextInput
                    placeholder='0'
                    value=''
                    disabled={false}
                    inputMode='numeric'
                    readOnly={true}
                    title='You receive stEVER'
                    iconUrl='https://raw.githubusercontent.com/broxus/flatqube-assets/master/icons/stEVER/logo.svg'
                />
                <br />
                <Button type='primary' className='uk-width-1-1' >
                    Stake EVER
                </Button>
            </Flex>
        </>
    )
}
function FormStakUnstake(): JSX.Element {
    return (
        <>
            <Flex flexDirection='column' justifyContent='between'>
                <TextInput
                    placeholder='0'
                    value=''
                    disabled={false}
                    inputMode='numeric'
                    readOnly={true}
                    title='You receive stEVER'
                    iconUrl='https://raw.githubusercontent.com/broxus/flatqube-assets/master/icons/stEVER/logo.svg'
                />
                <br />
                <TextInput
                    placeholder='0'
                    value=''
                    disabled={false}
                    inputMode='numeric'
                    readOnly={false}
                    title='You spend EVER'
                    iconUrl='https://app.flatqube.io/assets/992f1244bd3cbc67afa8.svg'
                />
                <br />
                <Button type='default' className='uk-width-1-1' >
                    Unstake EVER
                </Button>
            </Flex>
        </>
    )
}