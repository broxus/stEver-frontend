import * as React from 'react'
import './formStak.scss'
import { Form, Tabs } from '@broxus/react-uikit'

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
                                children: 'Tab 1',
                            },
                            {
                                label: 'Unstake',
                                key: '3',
                                children: 'Tab 3',
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}
