import * as React from 'react'
import { Observer, observer } from 'mobx-react-lite'
import Media from 'react-media'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import {
    Button, Flex, Navbar, Text,
} from '@broxus/react-uikit'
import { ConnectButton, TvmConnector, useTvmWalletContext } from '@broxus/react-modules'
import { Icon } from '@broxus/react-components'

import { HeaderDrawer } from '@/components/layout/HeaderDrawer'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import './Header.scss'
import { useStore } from '@/hooks/useStore'
import { ChartStore } from '@/modules/Dashboard/store/chartStore'

import { DesktopNav } from './DesktopNav'
import libraryIcon from '../common/lib'
import { Date } from '../common/Date'

export function HeaderInner(): JSX.Element {
    const wallet = useTvmWalletContext()
    const intl = useIntl()
    const dashboard = useStore(ChartStore)

    return (
        <header className="header">
            <Navbar className="uk-width-expand">
                <Media query={{ minWidth: 768 }}>
                    {match => (match
                        ? (
                            <>
                                <Navbar.Left className="uk-width-expand">
                                    <Link to={appRoutes.home.makeUrl()} className="logo">
                                        <Logo />
                                    </Link>
                                    <DesktopNav />
                                </Navbar.Left>
                                <Navbar.Item>
                                    <Observer>
                                        {() => (
                                            <Flex className="nextDistribution">
                                                {dashboard?.strategyMainInfo?.roundEnd
                                                && (
                                                    <>
                                                        <Flex
                                                            justifyContent="center"
                                                            flexDirection="column"
                                                        >
                                                            <Icon
                                                            // @ts-ignore
                                                                lib={libraryIcon}
                                                                // @ts-ignore
                                                                icon="time"
                                                            />
                                                        </Flex>

                                                        <Flex
                                                            flexDirection="column"
                                                        >
                                                            <Text
                                                                className="uk-margin-remove"
                                                                component="p"
                                                            >
                                                                Next distribution
                                                            </Text>
                                                            <Text
                                                                className="uk-margin-remove"
                                                                component="p"
                                                            >
                                                                <Date line time={dashboard?.strategyMainInfo?.roundEnd * 1000} />
                                                            </Text>
                                                        </Flex>
                                                    </>
                                                )}
                                            </Flex>
                                        )}
                                    </Observer>
                                </Navbar.Item>
                                <Observer>
                                    {() => (
                                        <Navbar.Right className="header-switchers" component={Navbar.Item}>
                                            <TvmConnector
                                                standalone
                                                showDropMenu={false}

                                            />
                                            {wallet.isConnected
                                            && (
                                                <Button
                                                    type="default"
                                                    style={{ padding: '0px 5px' }}
                                                    onClick={() => wallet.disconnect()}
                                                >
                                                    <Icon className="iconLogout" icon="logout" />
                                                </Button>
                                            )}
                                        </Navbar.Right>
                                    )}
                                </Observer>
                            </>
                        )
                        : (
                            <Observer>
                                {() => (
                                    <>
                                        <Navbar.Left>
                                            <Navbar.Item>
                                                <Link to={appRoutes.home.makeUrl()} className="logo">
                                                    <Logo ratio={1} />
                                                </Link>
                                            </Navbar.Item>
                                        </Navbar.Left>
                                        <Navbar.Right>
                                            <Navbar.Item>
                                                {wallet.isConnected
                                                    ? (
                                                        <TvmConnector
                                                            standalone
                                                            showDropMenu={false}
                                                        />
                                                    )
                                                    : (
                                                        <ConnectButton
                                                            key="connect"
                                                            popupType="modal"
                                                            type="default"
                                                            className="button-connect"
                                                            standalone
                                                        >
                                                            {intl.formatMessage({
                                                                id: 'CONNECT_WALLET',
                                                            })}
                                                        </ConnectButton>
                                                    )}
                                                <HeaderDrawer />
                                            </Navbar.Item>
                                        </Navbar.Right>
                                    </>
                                )}
                            </Observer>
                        ))}
                </Media>
            </Navbar>
        </header>
    )
}

export const Header = observer(HeaderInner)
