import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Link, NavLink } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

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
                size="md"
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
                size="md"
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
                            <div className="footer-nav__col-title">
                                Product
                            </div>
                            <ul className="footer-nav__list">
                                <li>
                                    <a href="https://octusbridge.io" target="_blank" rel="noopener noreferrer">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="https://everscan.io" target="_blank" rel="noopener noreferrer">
                                        Docs
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wrappedever.io" target="_blank" rel="noopener noreferrer">
                                        Make a deposit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://l1.broxus.com/everscale/wallet"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Become a validator
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-nav__col">
                            <div className="footer-nav__col-title">
                                Our services
                            </div>
                            <ul className="footer-nav__list">
                                <li>
                                    <a href="https://docs.flatqube.io/" target="_blank" rel="noopener noreferrer">
                                        Octus Bridge
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.everwallet.net/" target="_blank" rel="noopener noreferrer">
                                        EVER Wallet
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.everwallet.net/concepts/ever-and-wever" target="_blank" rel="noopener noreferrer">
                                        WEVER
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.everwallet.net/concepts/ever-and-wever" target="_blank" rel="noopener noreferrer">
                                        FlatQube
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="footer__right">
                        {toolbar}
                    </div>
                </div>
                <div className="footer__bottom">
                    <ul className="footer-soc">
                        <li>
                            <a
                                href="https://discord.gg/6dryaZQNmC"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Discord"
                            >
                                <Icon icon="discord" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://t.me/FlatQube"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Telegram"
                            >
                                <Icon icon="telegram" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/FlatQube"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                            >
                                <Icon icon="twitter" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://flatqube.medium.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Medium"
                            >
                                <Icon icon="medium" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/broxus"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <Icon icon="github" />
                            </a>
                        </li>
                    </ul>
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
                        <nav className="footer-subnav">
                            <ul>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/terms_of_use.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_TERMS_OF_USE_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/privacy_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_PRIVACY_POLICY_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/cookie_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_COOKIES_TERMS_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
