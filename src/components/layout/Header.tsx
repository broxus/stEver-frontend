import * as React from 'react'
import { Observer, observer } from 'mobx-react-lite'
import Media from 'react-media'
import { Link } from 'react-router-dom'
import { Button, Flex, Navbar } from '@broxus/react-uikit'

import { HeaderDrawer } from '@/components/layout/HeaderDrawer'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import { DesktopNav } from './DesktopNav'

import './Header.scss'
import { ConnectButton, TvmConnector, useTvmWalletContext } from '@broxus/react-modules'
import { Icon } from '@broxus/react-components'

export function HeaderInner(): JSX.Element {
    const wallet = useTvmWalletContext()

    return (
        <header className="header">
            <Navbar className="uk-width-expand">
                <Media query={{ minWidth: 768 }}>
                    {match => match && (
                        <>
                            <Navbar.Left className="uk-width-expand">
                                <Link to={appRoutes.home.makeUrl()} className="logo">
                                    <Logo />
                                </Link>
                                <DesktopNav />
                            </Navbar.Left>
                            <Navbar.Right className="header-switchers" component={Navbar.Item}>
                                {wallet.isConnected &&
                                    <>
                                        <TvmConnector
                                            standalone
                                            showDropMenu={false}
                                        />
                                        <Button type='default'
                                            style={{ padding: "0px 5px" }}
                                            onClick={() => wallet.disconnect()}>
                                            <Icon className='iconLogout' icon="logout" />
                                        </Button>
                                    </>
                                }
                            </Navbar.Right>
                        </>
                    )}
                </Media>

                <Media query={{ maxWidth: 767 }}>
                    {match => match && (
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
                                            {wallet.isConnected ?
                                                <TvmConnector
                                                    standalone
                                                    showDropMenu={false}
                                                />
                                                :
                                                <ConnectButton
                                                    key="connect"
                                                    popupType="modal"
                                                    type='default'
                                                    className='button-connect'
                                                    standalone>
                                                    Connect wallet
                                                </ConnectButton>
                                            }
                                            <HeaderDrawer />
                                        </Navbar.Item>
                                    </Navbar.Right>
                                </>
                            )}
                        </Observer>
                    )}
                </Media>
            </Navbar>
        </header>
    )
}

export const Header = observer(HeaderInner)
