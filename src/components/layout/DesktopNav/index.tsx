import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'

import { appRoutes } from '@/routes'

import './index.scss'
import { Icon, Nav, Navbar } from '@broxus/react-uikit'


export function DesktopNav(): JSX.Element {
    const intl = useIntl()

    const expandIcon = React.useMemo(() => <Icon icon="arrowDown" className="nav__arrow" />, [])

    return (
        <Navbar.Nav>
            <Nav.Item>
                <NavLink key="stake" to={appRoutes.stake.makeUrl()}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_STAKE',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="dashboard" to={appRoutes.dashboard.makeUrl()}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_DASHBOARD',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="docs" to={appRoutes.docs.makeUrl()}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_DOCS',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="decomeValidator" to={appRoutes.decomeValidator.makeUrl()}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_BECOME_A_VLIDATOR',
                    })}
                </NavLink>
            </Nav.Item>
        </Navbar.Nav>
    )
}
