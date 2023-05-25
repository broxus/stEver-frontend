import * as React from 'react'
import 'setimmediate';
import { storage } from '@/utils'

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

type ThemeShape = {
    theme: Theme,
    toggle: () => void,
}

export function useTheme(): ThemeShape {
    const [theme, setTheme] = React.useState<Theme>(
        storage.get('theme') as Theme ?? Theme.Light,
    )

    React.useEffect(() => {
        const body = document.documentElement
        // document.body.classList.add('theme-light');
        body.style.backgroundColor = "#050B2E"
        body.classList.add('no-transition')
        body.setAttribute('theme', theme)

        setImmediate(() => {
            body.classList.remove('no-transition')
        })

        if (storage.available()) {
            storage.set('theme', theme)
        }
    }, [theme])

    const toggle = React.useCallback(
        () => {
            setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
        },
        [setTheme, theme],
    )

    return React.useMemo(
        () => ({
            theme,
            toggle,
        }),
        [theme, toggle],
    )
}
