import * as React from 'react'
import classNames from 'classnames'

import './index.scss'
import { Badge, Flex, Grid, Label, Text } from '@broxus/react-uikit';
import { AmountInput, TokenAmountInput, TokenBadge } from '@broxus/react-components';

export type TextInputProps = {
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
}

export function TextInput({
    placeholder,
    value = '',
    disabled,
    id,
    inputMode,
    readOnly,
    onBlur,
    onChange,
    onChangeInput,
    onFocus,
    title,
    iconUrl
}: TextInputProps): JSX.Element {

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value)
        onChangeInput?.(e)
    }

    return (
        <Flex childWidth={1} flexDirection='column' className='text-input-container' >
            <Flex className='uk-margin-remove' justifyContent='between'>
                <Text size='small' component='p' className='uk-margin-remove'>{title}</Text>
                {readOnly && <Text size='small' component='p' className='uk-margin-remove'>≈ 1.2395 EVER <Label type='success'>12% APY</Label> </Text>}

            </Flex>

            <TokenAmountInput
                placeholder={placeholder}
                id={id}
                inputMode={inputMode}
                value={value}
                disabled={disabled}
                showMaxButton={!readOnly}
                readOnly={readOnly}
                onBlur={onBlur}
                onFocus={onFocus}
                className='text-input'
                iconSize={24}
                iconUrl={iconUrl}
            />
        </Flex>
    )
}
