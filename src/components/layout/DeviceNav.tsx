import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Button, Link, Nav } from '@broxus/react-uikit'

import { appRoutes } from '@/routes'

import './DeviceNav.scss'
import { ConnectButton, useTvmWalletContext } from '@broxus/react-modules'
import { Icon } from '@broxus/react-components'

type Props = {
    onNavigate?: () => void;
}


export function DeviceNav({ onNavigate }: Props): JSX.Element {
    const intl = useIntl()
    const wallet = useTvmWalletContext()

    return (
        <>
            <Nav className="device-nav" modifiers={['divider']}>
                <Nav.Item key="stake">
                    <NavLink to={appRoutes.stake.makeUrl()} onClick={onNavigate}>
                        {intl.formatMessage({
                            id: 'NAV_LINK_TEXT_STAKE',
                        })}
                    </NavLink>
                </Nav.Item>
                <Nav.Item key="dashboard">
                    <NavLink to={appRoutes.dashboard.makeUrl()} onClick={onNavigate}>
                        {intl.formatMessage({
                            id: 'NAV_LINK_TEXT_DASHBOARD',
                        })}
                    </NavLink>
                </Nav.Item>
            </Nav>
            <Button type='default' className='logout' onClick={() => wallet.disconnect()}>
                <Icon icon="logout" />
                Log out
            </Button>
        </>
    )
}
