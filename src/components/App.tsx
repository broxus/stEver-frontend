import * as React from 'react'
import { IntlProvider } from 'react-intl'
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
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

import { Footer } from './layout/Footer'
import { Header } from './layout/Header'

export function App(): JSX.Element {
    const localization = React.useContext(LocalizationContext)
    const wallet = useTvmWallet()

    OpenAPI.BASE = 'https://staking.everwallet.net/v1'

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

                            </Switch>
                        </main>
                        <Footer key="footer" />
                    </div>
                </Router>
            </TvmWalletProvider>
        </IntlProvider>
    )
}
