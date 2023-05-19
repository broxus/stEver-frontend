import * as React from 'react'

import { useTheme } from '@/hooks/useTheme'

export const ThemeContext = React.createContext<ReturnType<typeof useTheme> | undefined>(undefined)
ThemeContext.displayName = 'Theme'

type Props = {
    children: React.ReactNode;
}

export function ThemeProvider({
    children,
}: Props): JSX.Element | null {
    const theme = useTheme()

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}
