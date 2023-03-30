import * as React from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import {
    Button, Card, Flex, Text,
} from '@broxus/react-uikit'
import { AmountInput } from '@broxus/react-components'

import './Pagination.scss'
import { DownloadCsv } from './DownloadCsv'

export type PaginationProps = {
    className?: string;
    currentPage?: number;
    disabled?: boolean;
    totalPages: number;
    onNext?: () => void;
    onPrev?: () => void;
    onSubmit?: (value: number) => void;
}

export const Pagination = React.memo(({
    className,
    currentPage = 1,
    disabled,
    totalPages = 0,
    onNext,
    onPrev,
    onSubmit,
}: PaginationProps): JSX.Element => {

    const [value, setValue] = React.useState<string>(currentPage.toString())

    const onChange = (_: string): void => {
        setValue?.(_)
    }

    const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.keyCode === 13) {
            let newPage = parseInt(value, 10)

            if (Number.isNaN(newPage)) {
                return
            }
            if (newPage > totalPages) {
                newPage = totalPages
                setValue(totalPages.toString())
            }
            else if (newPage <= 0) {
                newPage = 1
                setValue('1')
            }
            onSubmit?.(newPage)
        }
    }

    React.useEffect(() => {
        setValue(currentPage.toString())
    }, [currentPage])

    return (
        <div className={classNames('pagination', className)}>
            <Flex justifyContent="between">
                <Flex justifyContent="right">
                    <AmountInput
                        className="pagination__input uk-margin-small-right"
                        inputMode="decimal"
                        readOnly
                        type="text"
                        value={value}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                        showMaxButton={false}
                    />
                    <Text className="uk-margin-small-right uk-margin-auto-vertical ">
                        page of {" "}{totalPages}
                    </Text>
                    <Card>
                        <Button
                            className="uk-margin-small-right " type="default" onClick={onPrev}
                            disabled={disabled || currentPage === 1}
                        >
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 13L2 7L8 1" stroke="#2B63F1" stroke-width="1.6" />
                            </svg>
                        </Button>
                        <Button type="default" onClick={onNext} disabled={disabled || !totalPages || currentPage === totalPages}>
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="#2B63F1" stroke-width="1.6" />
                            </svg>
                        </Button>
                    </Card>
                </Flex>
            </Flex>

        </div>
    )
})
