import * as React from 'react'
import { useIntl } from 'react-intl'
import { Link, useHistory } from 'react-router-dom'
import {
    Link as LinkText, List, Flex, Button, Tile, Text
} from '@broxus/react-uikit'
import { useTvmWalletContext } from '@broxus/react-modules'

import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import { Icon } from '@broxus/react-components'
import libraryIcon from '../common/lib'

import './Footer.scss'

export function Footer(): JSX.Element {
    const intl = useIntl()
    const history = useHistory();
    const wallet = useTvmWalletContext()
    const toolbar = (
        <div className="toolbar">
            {/* {wallet.isConnected ? */}
            <Button
                ghost
                rel="noopener noreferrer"
                target="_blank"
                type="default"
                onClick={() => history.push(appRoutes.stake.path)}
            >
                {intl.formatMessage({
                    id: 'FOOTER_MAKE_A_DEPOSIT_LINK_TEXT',
                })}
            </Button>
            {/* : */}
            <Button
                ghost
                href="https://everwallet.net/"
                rel="noopener noreferrer"
                target="_blank"
                type='default'
            >
                {intl.formatMessage({
                    id: 'FOOTER_WALLET_INSTALLATION_LINK_TEXT',
                })}
            </Button>
            {/* } */}
        </div>
    )
    return (
        <footer className="footer">
            <div className="container container--large">
                <div className="footer__wrapper">
                    <div className="footer__left">
                        <Link to={appRoutes.home.makeUrl()} className="footer-logo">
                            <Logo />
                        </Link>
                        {toolbar}
                    </div>
                    <nav className="footer-nav">
                        <div className="footer-nav__col">
                            <Text component="h6" className="footer-nav__col-title">
                                {intl.formatMessage({ id: 'FOOTER_NAV_HEADER_PRODUCT' })}
                            </Text>
                            <List className='uk-margin-remove'>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <Link to={appRoutes.dashboard.path}>
                                        <LinkText type="text">
                                            {intl.formatMessage({
                                                id: 'FOOTER_NAV_PRODUCT_LINK_DASHBOARD',
                                            })}
                                        </LinkText>
                                    </Link>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <Link to={appRoutes.home.path}>
                                        <LinkText type="text">
                                            {intl.formatMessage({
                                                id: 'FOOTER_NAV_PRODUCT_LINK_MAKE_A_DEPOSIT',
                                            })}
                                        </LinkText>
                                    </Link>
                                </Tile>
                            </List>
                        </div>
                        <div className="footer-nav__col">
                            <Text component="h6" className="footer-nav__col-title">
                                {intl.formatMessage({
                                    id: 'FOOTER_NAV_HEADER_OUR_SERVICES',
                                })}
                            </Text>
                            <List className='uk-margin-remove'>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text" href="https://octusbridge.io/">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_OCTUS_BRIDGE',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text" href="https://everwallet.net/">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_EVER_WALLET',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text" href="https://docs.everwallet.net/concepts/ever-and-wever">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_WEVER',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text" href="https://flatqube.io/">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_FLAT_QUBE',
                                        })}
                                    </LinkText>
                                </Tile>
                            </List>
                        </div>
                    </nav>
                    <div className="footer__right">
                        {toolbar}
                    </div>
                </div>
                <div className="footer__bottom">
                    <Flex>
                        <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                            <LinkText
                                type="text"
                                href="https://discord.com/invite/pPNcjgNXFv"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Discord"
                            >

                                <Icon
                                    //@ts-ignore
                                    lib={libraryIcon}
                                    //@ts-ignore
                                    icon='discord'
                                />
                            </LinkText>
                        </Tile>
                        <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                            <LinkText
                                type="text"
                                href="https://t.me/broxus_chat"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Telegram"
                            >
                                <Icon icon="telegram" />
                            </LinkText>
                        </Tile>
                        <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                            <LinkText
                                type="text"
                                href="https://twitter.com/Broxus"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter_filled"
                            >
                                <Icon icon="twitter" />
                            </LinkText>
                        </Tile>
                        <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                            <LinkText
                                type="text"
                                href="https://broxus.medium.com/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Medium"
                            >
                                <Icon icon="medium" />
                            </LinkText>
                        </Tile>
                        <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                            <LinkText
                                type="text"
                                href="https://github.com/broxus"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <Icon icon="github" />
                            </LinkText>
                        </Tile>
                    </Flex>
                    <div className="footer__sub">
                        <LinkText
                            type="text"
                            className="footer-copyright"
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: 'FOOTER_COPYRIGHTS',
                                }, {
                                    year: new Date().getFullYear(),
                                }, {
                                    ignoreTag: true,
                                }),
                            }}
                        />
                        <nav className="footer-subnav">
                            <Flex>
                                <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                                    <LinkText
                                        type="text"
                                        href="https://broxus.com/wp-content/uploads/2021/08/terms_of_use.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_TERMS_OF_USE_LINK_TEXT',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">

                                    <LinkText
                                        type="text"
                                        href="https://broxus.com/wp-content/uploads/2021/08/privacy_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_PRIVACY_POLICY_LINK_TEXT',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size="xsmall" className="uk-padding-small uk-padding-remove-vertical">
                                    <LinkText
                                        type="text"
                                        href="https://broxus.com/wp-content/uploads/2021/08/cookie_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_COOKIES_TERMS_LINK_TEXT',
                                        })}
                                    </LinkText>
                                </Tile>
                            </Flex>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
