import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from '@/components/App'
import '@/polyfills'

const container = document.getElementById('root')
if (container != null) {
    const root = ReactDOM.createRoot(container)
    root.render(
        <React.StrictMode>
            <App />
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
