import * as React from 'react'
import classNames from 'classnames'

import './index.scss'
import { Badge, Flex, Grid, Text } from '@broxus/react-uikit';
import { AmountInput, TokenAmountInput, TokenBadge } from '@broxus/react-components';

export type TextInputProps = {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    id?: string;
    invalid?: boolean;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    size?: 'small' | 'medium';
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    readOnly?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function TextInput({
    placeholder,
    value = '',
    disabled,
    id,
    invalid,
    inputMode,
    size,
    prefix,
    suffix,
    readOnly,
    className,
    onBlur,
    onChange,
    onChangeInput,
    onFocus,
}: TextInputProps): JSX.Element {

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value)
        onChangeInput?.(e)
    }

    return (
        <Flex childWidth={1} flexDirection='column' className='text-input-container' >
            <Text size='small' component='p' className='uk-margin-remove'>You spend EVER</Text>
            <TokenAmountInput
                placeholder={placeholder}
                // id={id}
                // inputMode={inputMode}
                value={'0'}
                // disabled={disabled}
                // readOnly={readOnly}
                // onBlur={onBlur}
                // onFocus={onFocus}
                className='text-input'
                iconSize={24}
                iconUrl='https://app.flatqube.io/assets/992f1244bd3cbc67afa8.svg' />
        </Flex>
    )
}
