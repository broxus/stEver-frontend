import * as React from 'react'
import { IntlProvider } from 'react-intl'
import {
    BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom'
import { TvmWalletProvider } from '@broxus/react-modules'

import { LocalizationContext } from '@/context/Localization'
import { useTvmWallet } from '@/utils/useTvmWallet'
import { noop } from '@/utils'
import { appRoutes } from '@/routes'


import './App.scss'
import DashboardPage from '@/modules/Dashboard'
import StakPage from '@/modules/Stake'
import { OpenAPI } from '@/apiClientCodegen'
import StrategyPage from '@/modules/Strategy/page/Strategy'
import { API_URL } from '@/config'

import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
import { ScrollManager } from './layout/ScrollManager'

export function App(): JSX.Element {
    const localization = React.useContext(LocalizationContext)
    const wallet = useTvmWallet()

    OpenAPI.BASE = API_URL

    return (
        <IntlProvider
            key="intl"
            locale={localization.locale}
            defaultLocale="en"
            messages={localization.messages}
            onError={noop}
        >
            <TvmWalletProvider wallet={wallet}>
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
                                        <StakPage />
                                    </Route>

                                    <Route path={appRoutes.dashboard.path}>
                                        <DashboardPage />
                                    </Route>

                                    <Route path={appRoutes.strategy.path}>
                                        <StrategyPage />
                                    </Route>

                                </Switch>
                            </main>
                            <Footer key="footer" />
                        </div>
                    </ScrollManager>
                </Router>
            </TvmWalletProvider>
        </IntlProvider>
    )
}
