import * as React from 'react'
import { Settings } from 'luxon'
import { IntlProvider } from 'react-intl'
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

import Stake from '@/pages/stake'
import { appRoutes } from '@/routes'
import { isMobile, noop } from '@/utils'

import './App.scss'
import { LocalizationContext } from '@/context/Localization'


export function App(): JSX.Element {
    const localization = React.useContext(LocalizationContext)

    return (
        <IntlProvider
            key="intl"
            locale={localization.locale}
            defaultLocale="en"
            messages={localization.messages}
            onError={noop}
        >
            <Router>
                <ScrollManager>
                    <div className="wrapper">
                        <Header key="header" />
                        <main className="main">
                            <Switch>
                                <Route exact path="/">
                                    <Redirect exact to={appRoutes.stake.makeUrl()} />
                                </Route>

                                <Route path={appRoutes.stake.path}>
                                    <Stake />
                                </Route>
                            </Switch>
                        </main>
                        <Footer key="footer" />
                    </div>
                </ScrollManager>
            </Router> 
        </IntlProvider>
    )
}
