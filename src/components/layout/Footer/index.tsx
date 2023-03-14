import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Link, NavLink } from 'react-router-dom'

// import { Button } from '@/components/common/Button'
// import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import { Grid, Link as LinkText, List, Icon, Flex, Navbar, Heading, Button } from '@broxus/react-uikit'

import './index.scss'


export function Footer(): JSX.Element {
    const intl = useIntl()

    const toolbar = (
        <div className="toolbar">
            <Button
                className="footer-tool"
                ghost
                href="https://github.com/broxus/flatqube-frontend"
                rel="noopener noreferrer"
                target="_blank"
                type="secondary"
            >
                Install EVER Wallet
            </Button>
            <Button
                className="footer-tool"
                ghost
                href="https://github.com/broxus/flatqube-frontend"
                rel="noopener noreferrer"
                target="_blank"
                type="secondary"
            >
                Make a deposit
            </Button>
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
                            <Heading>
                                Product
                            </Heading>
                            <List>
                                <LinkText type="text" href="https://octusbridge.io" target="_blank" rel="noopener noreferrer">
                                    Dashboard
                                </LinkText>

                                <LinkText type="text" href="https://everscan.io" target="_blank" rel="noopener noreferrer">
                                    Docs
                                </LinkText>

                                <LinkText type="text" href="https://wrappedever.io" target="_blank" rel="noopener noreferrer">
                                    Make a deposit
                                </LinkText>
                                <LinkText type="text"
                                    href="https://l1.broxus.com/everscale/wallet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Become a validator
                                </LinkText>
                            </List>
                        </div>
                        <div className="footer-nav__col">
                            <Heading>
                                Our services
                            </Heading>

                            <List>
                                <LinkText type="text" href="https://docs.flatqube.io/" target="_blank" rel="noopener noreferrer">
                                    Octus Bridge
                                </LinkText>
                                <LinkText type="text" href="https://docs.everwallet.net/" target="_blank" rel="noopener noreferrer">
                                    EVER Wallet
                                </LinkText>
                                <LinkText type="text" href="https://docs.everwallet.net/concepts/ever-and-wever" target="_blank" rel="noopener noreferrer">
                                    WEVER
                                </LinkText>
                                <LinkText type="text" href="https://docs.everwallet.net/concepts/ever-and-wever" target="_blank" rel="noopener noreferrer">
                                    FlatQube
                                </LinkText>
                            </List>

                        </div>
                    </nav>
                    <div className="footer__right">
                        {toolbar}
                    </div>
                </div>
                <div className="footer__bottom">
                    <Flex>
                        <LinkText
                            type="text"
                            href="https://discord.gg/6dryaZQNmC"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Discord"
                        >
                            <Icon icon="discord" />
                        </LinkText>

                        <LinkText
                            type="text"
                            href="https://t.me/FlatQube"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Telegram"
                        >
                            <Icon icon="telegram" />
                        </LinkText>

                        <LinkText
                            type="text"
                            href="https://twitter.com/FlatQube"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter"
                        >
                            <Icon icon="twitter" />
                        </LinkText>

                        <LinkText
                            type="text"
                            href="https://flatqube.medium.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Medium"
                        >
                            <Icon icon="medium" />
                        </LinkText>

                        <LinkText
                            type="text"
                            href="https://github.com/broxus"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                        >
                            <Icon icon="github" />
                        </LinkText>

                    </Flex>
                    <div className="footer__sub">
                        <p
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
                        <Navbar>
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
                        </Navbar>
                    </div>
                </div>
            </div >
        </footer >
    )
}
