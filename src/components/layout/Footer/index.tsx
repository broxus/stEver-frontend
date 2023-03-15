import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Link, NavLink } from 'react-router-dom'

// import { Button } from '@/components/common/Button'
// import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'

import { Grid, Link as LinkText, List, Icon, Flex, Navbar, Heading, Button, Tile, Text } from '@broxus/react-uikit'

import './index.scss'

export function Footer(): JSX.Element {
    const intl = useIntl()

    const toolbar = (
        <div className="toolbar">
            <Button
                ghost
                href="https://github.com/broxus/flatqube-frontend"
                rel="noopener noreferrer"
                target="_blank"
                type='default'
            >
                {intl.formatMessage({
                    id: 'FOOTER_WALLET_INSTALLATION_LINK_TEXT',
                })}
            </Button>
            <Button
                ghost
                href="https://github.com/broxus/flatqube-frontend"
                rel="noopener noreferrer"
                target="_blank"
                type='default'
            >
                {intl.formatMessage({
                    id: 'FOOTER_MAKE_A_DEPOSIT_LINK_TEXT',
                })}
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
                            <Text component='h6' className="footer-nav__col-title">
                                {intl.formatMessage({ id: 'FOOTER_NAV_HEADER_OUR_ERVICES' })}
                            </Text>
                            <List>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_DASHBOARD',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_DOCS',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_MAKE_A_DEPOSIT',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_BECOME_A_VALIDATOR',
                                        })}
                                    </LinkText>
                                </Tile>
                            </List>
                            {/* <ul className="footer-nav__list">
                                <li>
                                    <a
                                        href="https://drive.google.com/u/0/uc?id=1V9rDRD6ltXTNwxmWqDw3ey3-SYTQX2mN&view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_DASHBOARD',
                                        })}
                                    </a>
                                </li>
                            </ul> */}

                        </div>
                        <div className="footer-nav__col">
                            <Text component='h6' className="footer-nav__col-title">
                                {intl.formatMessage({
                                    id: 'FOOTER_NAV_HEADER_OUR_ERVICES',
                                })}
                            </Text>
                            <List>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_OCTUS_BRIDGE',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_EVER_WALLET',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text' >
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_WEVER',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-remove'>
                                    <LinkText type='text'>
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV__OUR_ERVICES_LINK_FLAT_QUBE',
                                        })}
                                    </LinkText>
                                </Tile>
                            </List>
                            {/* <ul className="footer-nav__list">
 
                            </ul> */}
                        </div>
                    </nav>
                    <div className="footer__right">
                        {toolbar}
                    </div>
                </div>
                <div className="footer__bottom">
                    <Flex>
                        <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                            <LinkText
                                type='text'
                                href="https://discord.gg/6dryaZQNmC"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Discord">
                                <Icon icon="discord" />
                            </LinkText>
                        </Tile>
                        <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                            <LinkText
                                type='text'
                                href="https://t.me/FlatQube"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Telegram"
                            >
                                <Icon icon="telegram" />
                            </LinkText>
                        </Tile>
                        <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                            <LinkText
                                type='text'
                                href="https://twitter.com/FlatQube"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                            >
                                <Icon icon="twitter" />
                            </LinkText>
                        </Tile>
                        <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                            <LinkText
                                type='text'
                                href="https://flatqube.medium.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Medium"
                            >
                                <Icon icon="medium" />
                            </LinkText>
                        </Tile>
                    </Flex>
                    <div className="footer__sub">
                        <LinkText
                            type='text'
                            // className="footer-copyright"
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
                                <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                                    <LinkText
                                        type='text'
                                        href="https://broxus.com/wp-content/uploads/2021/08/terms_of_use.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_TERMS_OF_USE_LINK_TEXT',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>

                                    <LinkText
                                        type='text'
                                        href="https://broxus.com/wp-content/uploads/2021/08/privacy_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_PRIVACY_POLICY_LINK_TEXT',
                                        })}
                                    </LinkText>
                                </Tile>
                                <Tile size='xsmall' className='uk-padding-small uk-padding-remove-vertical'>
                                    <LinkText
                                        type='text'
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
        </footer >
    )
}
