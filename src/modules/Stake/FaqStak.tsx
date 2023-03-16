import * as React from 'react'
import { Accordion, Text } from '@broxus/react-uikit'

import './faqStak.scss'

export function FaqStak(): JSX.Element {
    return (
        <Accordion>
            <Accordion.Item header="How long does it take to stake/unstake tokens?">
                <Text>
                    Deposits are credited instantly and your money immediately begins to generate a profit. Withdrawals may take up to 36 hours. After a withdrawal, WEVER is credited to your account.
                </Text>
            </Accordion.Item>
            <Accordion.Item header="I sent more EVER than I received stEVER">
                <Text>
                    The price of 1 EVER is less than 1 stEVER, so for 1 EVER you get less than 1 stEVER.
                    After you unstake, you will get the opposite; more EVER than stEVER, because 1 stEVER is worth more than 1 EVER.
                </Text>
            </Accordion.Item>
        </Accordion>
    )
}
