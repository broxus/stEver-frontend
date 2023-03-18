import * as React from 'react'
import { Flex, Label, Text } from '@broxus/react-uikit'
import { TokenAmountInput } from '@broxus/react-components'
import classNames from 'classnames'

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
    price?: string;
    currency?: string;
    borderButtom?: boolean;
}

export function TextInput({
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

    title,
    price,
    currency,
    borderButtom
}: TextInputProps): JSX.Element {

    // const _onChange = (_: string): void => {
    //     onChange?.(_)
    // }
    // const [_value, setValue] = React.useState<string>()
    
    console.log(value)
    const _onChange = (_: string): void => {
        // console.log(_)
        // setValue(_)
        onChange?.(_)
    }


    return (
        <Flex childWidth={1} flexDirection="column" className={classNames(
            borderButtom && "text-input-border-buttom", "text-input-container"
        )}>
            <Flex className="uk-margin-remove" justifyContent="between">
                <Text size="small" component="p" className="uk-margin-remove">{title}</Text>
                {readOnly && (
                    <Text size="small" component="p" className="uk-margin-remove">
                        ≈{price}{' '}{currency}
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
                showMaxButton={!readOnly}
                readOnly={readOnly}
                onBlur={onBlur}
                onChange={_onChange}
                onFocus={onFocus}
                className="text-input"
                iconSize={24}
                iconUrl={iconUrl}
            />
        </Flex>
    )
}
