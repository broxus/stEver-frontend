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
import { Header } from './layout/Header'
import { appRoutes } from '@/routes'

import { Footer } from './layout/Footer'

import './App.scss'
import DashboardPage from '@/modules/Dashboard'
import StakPage from '@/modules/Stake'
import { useRpcClient, useRpcProvider } from '@broxus/js-core'
import { useProvider } from '@/hooks/useStore'

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
            <TvmWalletProvider wallet={wallet} >
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
