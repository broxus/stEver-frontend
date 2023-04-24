import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { Button, Nav } from '@broxus/react-uikit'
import { useTvmWalletContext } from '@broxus/react-modules'
import { observer } from 'mobx-react-lite'
import { Icon } from '@broxus/react-components'

import { appRoutes } from '@/routes'

import './DeviceNav.scss'

type Props = {
    onNavigate?: () => void;
}

function DeviceNavInner({ onNavigate }: Props): JSX.Element {
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
            {wallet.isConnected
                ? (
                    <Button type="default" className="logout" onClick={() => wallet.disconnect()}>
                        <Icon icon="logout" />
                        {intl.formatMessage({
                            id: 'LOG_OUT_WALLET',
                        })}
                    </Button>
                )
                : (
                    <Button type="default" className="logout" onClick={() => wallet.connect()}>
                        {intl.formatMessage({
                            id: 'CONNECT_WALLET',
                        })}
                    </Button>
                )}
        </>
    )
}

export const DeviceNav = observer(DeviceNavInner)
