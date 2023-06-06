import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from '@/components/App'
import '@/polyfills'
import { ThemeProvider } from './provider/ThemeProvider'
import { LocalizationProvider } from './context/Localization'

const container = document.getElementById('root')
if (container != null) {
    const root = ReactDOM.createRoot(container)
    root.render(
        <React.StrictMode>
            <ThemeProvider>
                <LocalizationProvider>
                    <App />
                </LocalizationProvider>
            </ThemeProvider>
        </React.StrictMode>,
    )
}

if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    if (import.meta.webpackHot) {
        // @ts-ignore
        import.meta.webpackHot.accept()
    }
}
