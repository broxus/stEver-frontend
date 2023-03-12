import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'

import { Badge } from '@/components/common/Badge'
import { Icon } from '@/components/common/Icon'
import { Nav } from '@/components/common/Nav'
import { Navbar } from '@/components/common/Navbar'
import { appRoutes } from '@/routes'

import './index.scss'


export function DesktopNav(): JSX.Element {
    const intl = useIntl()

    const expandIcon = React.useMemo(() => <Icon icon="arrowDown" className="nav__arrow" />, [])

    return (
        <Navbar.Nav className="desktop-nav flex-wrap width-expand">
            <Nav.Item key="stake">
                <NavLink to={appRoutes.stake.makeUrl()}>
                    Stake
                </NavLink>
            </Nav.Item>
            <Nav.Item key="dashboard">
                <NavLink to={appRoutes.dashboard.makeUrl()}>
                    Dashboard
                </NavLink>
            </Nav.Item>
            <Nav.Item key="docs">
                <NavLink to={appRoutes.docs.makeUrl()}>
                    Docs 
                </NavLink>
            </Nav.Item>
            <Nav.Item key="decomeValidator">
                <NavLink to={appRoutes.decomeValidator.makeUrl()}>
                    Become a validator
                </NavLink>
            </Nav.Item>
        </Navbar.Nav>
    )
}
