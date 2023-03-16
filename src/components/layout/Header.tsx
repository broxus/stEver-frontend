import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import Media from 'react-media'
import { Link } from 'react-router-dom'
import { WalletAccount } from '@broxus/react-components'
import { Navbar } from '@broxus/react-uikit'

import { HeaderDrawer } from '@/components/layout/HeaderDrawer'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import { DesktopNav } from './DesktopNav'

import './Header.scss'

export function Header(): JSX.Element {
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
                                {/* <EverWallet showDisconnectButton /> */}
                            </Navbar.Right>
                        </>
                    )}
                </Media>

                <Media query={{ maxWidth: 767 }}>
                    {match => match && (
                        <Observer>
                            {() => (
                                <>
                                    <Navbar.Item>
                                        <Link to={appRoutes.home.makeUrl()} className="logo">
                                            <Logo ratio={0.9} />
                                        </Link>
                                    </Navbar.Item>
                                    <Navbar.Item
                                        style={{
                                            justifyContent: 'space-between',
                                            paddingRight: 0,
                                        }}
                                    >
                                        {/* <EverWallet showDisconnectButton={false} /> */}
                                        <WalletAccount />
                                        <Navbar.Toggle icon>
                                            <HeaderDrawer />
                                        </Navbar.Toggle>
                                    </Navbar.Item>
                                </>
                            )}
                        </Observer>
                    )}
                </Media>
            </Navbar>
        </header>
    )
}
