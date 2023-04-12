import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { TvmWalletProvider } from '@broxus/react-modules'
import { IntlProvider } from 'react-intl'

import { LocalizationContext } from '@/context/Localization'
import { useTvmWallet, noop} from '@/utils'
import { appRoutes } from '@/routes'
import { OpenAPI } from '@/apiClientCodegen'
import { API_URL } from '@/config'

import './App.scss'

import DashboardPage from '@/modules/Dashboard'
import StakPage from '@/modules/Stake'
import StrategyPage from '@/modules/Strategy/page/Strategy'

import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
import { ScrollManager } from './layout/ScrollManager'

OpenAPI.BASE = API_URL

export function App(): JSX.Element {
    const localization = React.useContext(LocalizationContext)
    const wallet = useTvmWallet()
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
