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
                    Stake
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="dashboard" to={appRoutes.dashboard.makeUrl()}>
                    Dashboard
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="docs" to={appRoutes.docs.makeUrl()}>
                    Docs
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink key="decomeValidator" to={appRoutes.decomeValidator.makeUrl()}>
                    Become a validator
                </NavLink>
            </Nav.Item>
        </Navbar.Nav>
        // <Navbar.Nav className="desktop-nav flex-wrap width-expand">
        //     <Nav.Item key="stake">
        //         <NavLink to={appRoutes.stake.makeUrl()}>
        //             Stake
        //         </NavLink>
        //     </Nav.Item>
        //     <Nav.Item key="dashboard">
        //         <NavLink to={appRoutes.dashboard.makeUrl()}>
        //             Dashboard
        //         </NavLink>
        //     </Nav.Item>
        //     <Nav.Item key="docs">
        //         <NavLink to={appRoutes.docs.makeUrl()}>
        //             Docs 
        //         </NavLink>
        //     </Nav.Item>
        //     <Nav.Item key="decomeValidator">
        //         <NavLink to={appRoutes.decomeValidator.makeUrl()}>
        //             Become a validator
        //         </NavLink>
        //     </Nav.Item>
        // </Navbar.Nav>
    )
}
