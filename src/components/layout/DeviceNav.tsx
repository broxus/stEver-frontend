import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Link, Nav } from '@broxus/react-uikit'

import { appRoutes } from '@/routes'

import './DeviceNav.scss'

type Props = {
    onNavigate?: () => void;
}


export function DeviceNav({ onNavigate }: Props): JSX.Element {
    const intl = useIntl()

    return (
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
    )
}
