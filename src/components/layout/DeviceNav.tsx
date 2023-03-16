import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Nav } from '@broxus/react-uikit'

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
            <Nav.Item key="docs">
                <NavLink to={appRoutes.docs.makeUrl()} onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_DOCS',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="decomeValidator">
                <NavLink to={appRoutes.decomeValidator.makeUrl()} onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_BECOME_A_VLIDATOR',
                    })}
                </NavLink>
            </Nav.Item>
        </Nav>
    )
}
