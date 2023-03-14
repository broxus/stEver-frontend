import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'

import { appRoutes } from '@/routes'

import './index.scss'
import { Nav } from '@broxus/react-uikit'

type Props = {
    onNavigate?: () => void;
}


export function DeviceNav({ onNavigate }: Props): JSX.Element {
    const intl = useIntl()

    return (
        <Nav className="device-nav" modifiers={['divider']}>
            <Nav.Item key="stake">
                <NavLink to={appRoutes.stake.makeUrl()} onClick={onNavigate}>
                    Stake
                </NavLink>
            </Nav.Item>
            <Nav.Item key="dashboard">
                <NavLink to={appRoutes.dashboard.makeUrl()} onClick={onNavigate}>
                    Dashboard
                </NavLink>
            </Nav.Item>
            <Nav.Item key="docs">
                <NavLink to={appRoutes.docs.makeUrl()} onClick={onNavigate}>
                    Docs
                </NavLink>
            </Nav.Item>
            <Nav.Item key="decomeValidator">
                <NavLink to={appRoutes.decomeValidator.makeUrl()} onClick={onNavigate}>
                    Become a validator
                </NavLink>
            </Nav.Item>
        </Nav>
    )
}
