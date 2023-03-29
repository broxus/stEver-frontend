import * as React from 'react'
import { useIntl } from 'react-intl'
import { Link, useHistory } from 'react-router-dom'
import {
    Link as LinkText, List, Flex, Button, Tile, Text, getSize,
} from '@broxus/react-uikit'

import { Logo } from '@/components/layout/Logo'
import { appRoutes } from '@/routes'


import './Footer.scss'
import { Icon } from '@broxus/react-components'

export function Footer(): JSX.Element {
    const intl = useIntl()
    const history = useHistory();


    const defaultProps = {
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
    }

    type Props = {
        ratio?: number
    }

    function t<V extends React.ElementType<Props>, T extends { [key in string]: V }>(obj: T): T {
        return obj
    }

    const lib = t({
        discord: ({ ratio = 1, ...props }) => <svg {...defaultProps} {...props} viewBox="0 0 20 20" {...getSize(20, 20, ratio)}><path d="M16.5054 4.47543C14.9479 3.22203 12.4839 3.00957 12.3784 3.00192C12.2148 2.98817 12.0589 3.07988 11.9917 3.2312C11.9856 3.24038 11.9321 3.36419 11.8725 3.55678C12.9027 3.73103 14.1683 4.08107 15.3132 4.79184C15.4966 4.90495 15.5532 5.14646 15.44 5.32988C15.3651 5.45063 15.2383 5.51636 15.1068 5.51636C15.0365 5.51636 14.9647 5.49649 14.9005 5.45675C12.9317 4.23545 10.4738 4.17431 10 4.17431C9.52615 4.17431 7.06675 4.23545 5.09952 5.45675C4.9161 5.57139 4.67459 5.51483 4.56148 5.33141C4.44684 5.14646 4.5034 4.90648 4.68682 4.79184C5.83169 4.0826 7.09732 3.73103 8.12755 3.55831C8.06793 3.36419 8.01444 3.2419 8.00985 3.2312C7.94107 3.07988 7.78668 2.98511 7.6216 3.00192C7.51613 3.00957 5.05214 3.22203 3.47317 4.49224C2.64929 5.25498 1 9.71218 1 13.5656C1 13.6344 1.01834 13.7001 1.05197 13.7597C2.1892 15.7591 5.29365 16.2818 6.00136 16.3047C6.00442 16.3047 6.009 16.3047 6.01359 16.3047C6.13893 16.3047 6.25662 16.2451 6.32999 16.1442L7.04535 15.1599C5.11481 14.6616 4.12891 13.8148 4.07235 13.7643C3.91033 13.6222 3.89504 13.3745 4.03872 13.2125C4.18088 13.0505 4.4285 13.0352 4.59052 13.1774C4.61345 13.1988 6.42935 14.7395 10 14.7395C13.5768 14.7395 15.3927 13.1927 15.411 13.1774C15.573 13.0367 15.8191 13.0505 15.9628 13.2141C16.105 13.3761 16.0897 13.6222 15.9276 13.7643C15.8711 13.8148 14.8852 14.6616 12.9547 15.1599L13.67 16.1442C13.7434 16.2451 13.8611 16.3047 13.9864 16.3047C13.991 16.3047 13.9956 16.3047 13.9986 16.3047C14.7064 16.2818 17.8108 15.7591 18.948 13.7597C18.9817 13.7001 19 13.6344 19 13.5656C19 9.71218 17.3507 5.25498 16.5054 4.47543ZM7.45652 12.0004C6.6999 12.0004 6.08696 11.3003 6.08696 10.4352C6.08696 9.57003 6.6999 8.86996 7.45652 8.86996C8.21315 8.86996 8.82609 9.57003 8.82609 10.4352C8.82609 11.3003 8.21315 12.0004 7.45652 12.0004ZM12.5435 12.0004C11.7869 12.0004 11.1739 11.3003 11.1739 10.4352C11.1739 9.57003 11.7869 8.86996 12.5435 8.86996C13.3001 8.86996 13.913 9.57003 13.913 10.4352C13.913 11.3003 13.3001 12.0004 12.5435 12.0004Z" fill="currentColor" /></svg>,
    })



    const toolbar = (
        <div className="toolbar">
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
                                {intl.formatMessage({ id: 'FOOTER_NAV_HEADER_OUR_ERVICES' })}
                            </Text>
                            <List>
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <Link to={appRoutes.dashboard.path}>
                                        <LinkText type="text">
                                            {intl.formatMessage({
                                                id: 'FOOTER_NAV_PRODUCT_LINK_DASHBOARD',
                                            })}
                                        </LinkText>
                                    </Link>
                                </Tile>
                                {/* <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_DOCS',
                                        })}
                                    </LinkText>
                                </Tile> */}
                                <Tile size="xsmall" className="uk-padding-remove">
                                    <Link to={appRoutes.home.path}>
                                        <LinkText type="text">
                                            {intl.formatMessage({
                                                id: 'FOOTER_NAV_PRODUCT_LINK_MAKE_A_DEPOSIT',
                                            })}
                                        </LinkText>
                                    </Link>
                                </Tile>
                                {/* <Tile size="xsmall" className="uk-padding-remove">
                                    <LinkText type="text">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_PRODUCT_LINK_BECOME_A_VALIDATOR',
                                        })}
                                    </LinkText>
                                </Tile> */}
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
                            <Text component="h6" className="footer-nav__col-title">
                                {intl.formatMessage({
                                    id: 'FOOTER_NAV_HEADER_OUR_ERVICES',
                                })}
                            </Text>
                            <List>
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
                                    lib={lib}
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
