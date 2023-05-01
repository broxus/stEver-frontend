import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from '@broxus/react-uikit'

import { appRoutes } from '@/routes'

import './DesktopNav.scss'

export function DesktopNav(): JSX.Element {
    const intl = useIntl()
    // const expandIcon = React.useMemo(() => <Icon icon="arrowDown" className="nav__arrow" />, [])
    return (
        <Navbar.Nav className="uk-width-expand desktop-nav">
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
                <a
                    href="https://docs.stakedever.io/overview/about-stever"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {intl.formatMessage({
                        id: 'MANUAL',
                    })}
                </a>
            </Nav.Item>
        </Navbar.Nav>
    )
}
