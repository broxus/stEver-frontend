import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Flex, Text } from '@broxus/react-uikit'
import { TokenAmountInput } from '@broxus/react-components'
import classNames from 'classnames'

import { ST_EVER_DECIMALS } from '@/config'
import './TextInput.scss'

export type TextInputProps = {
    autoFocus?: boolean;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    id?: string;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    readOnly?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    title: string;
    iconUrl: string;
    maxValue?: string;
    price?: string;
    currency?: string;
    borderButtom?: boolean;
    showMaxButton?: boolean
}

function TextInputInner({
    autoFocus,
    placeholder,
    value = '',
    disabled,
    id,
    inputMode,
    readOnly,
    onBlur,
    onChange,
    onFocus,
    iconUrl,
    maxValue,
    title,
    price,
    currency,
    borderButtom,
    showMaxButton = false
}: TextInputProps): JSX.Element {
    const _onChange = (_: string): void => {
        onChange?.(_)
    }
    return (
        <Flex
            flexDirection="column" className={classNames(borderButtom && 'text-input-border-buttom', 'text-input-container')}
        >
            <Flex className="uk-margin-remove" justifyContent="between">
                <Text size="small" component="p" className="uk-margin-remove">{title}</Text>
                {readOnly && (
                    <Text size="small" component="p" className="uk-margin-remove">
                        1 EVER ≈
                        {' '}
                        {price}
                        {' '}
                        {currency}
                    </Text>
                )}
            </Flex>
            <TokenAmountInput
                autoFocus={autoFocus}
                placeholder={placeholder}
                id={id}
                inputMode={inputMode}
                value={value}
                disabled={disabled}
                showMaxButton={showMaxButton}
                maxValue={maxValue}
                readOnly={readOnly}
                onBlur={onBlur}
                onChange={_onChange}
                onFocus={onFocus}
                className="text-input"
                iconSize={24}
                iconUrl={iconUrl}
                precision={ST_EVER_DECIMALS}
            />
        </Flex>
    )
}

export const TextInput = observer(TextInputInner)
