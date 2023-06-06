import * as React from 'react'
import classNames from 'classnames'


import { LANGUAGES, Locale, LocalizationContext } from '@/context/Localization'
import { storage } from '@/utils'

import './LangSwitcher.scss'
import { Button, Drop } from '@broxus/react-uikit'
import { Icon } from '@broxus/react-components'

export function LangSwitcher(): JSX.Element {
    const language = React.useContext(LocalizationContext)

    const label = React.useMemo(
        () => LANGUAGES.find(lang => lang.code === language.locale)?.nativeLabel,
        [language.locale],
    )

    const setLocale = (locale: Locale) => () => {
        storage.set('lang', locale)
        language.setLocale(locale)
    }

    return (
        <Drop
            overlay={(
                <ul className="languages-list">
                    {LANGUAGES.map(lang => (
                        <li key={lang.code}>
                            <Button
                                className={classNames({
                                    active: language.locale === lang.code,
                                })}
                                type="link"
                                onClick={setLocale(lang.code)}
                            >
                                {lang.nativeLabel}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            overlayClassName="languages-drop"
            placement="bottom-right"
            trigger="click"
        >
            <Button
                className="language-switcher"
                type="link"
            >
                <Icon icon="world" />
                {label}
                <Icon className="arrow" icon="arrowDown" />
            </Button>
        </Drop>
    )
}
