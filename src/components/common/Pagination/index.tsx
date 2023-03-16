import * as React from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import './index.scss'
import {
    Button, Card, Flex, Text,
} from '@broxus/react-uikit'
import { AmountInput } from '@broxus/react-components'

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
    const intl = useIntl()

    const [value, setValue] = React.useState<string>(currentPage.toString())

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setValue(event.target.value)
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
        <div className={classNames('pagination', 'uk-margin-small', className)}>

            <Flex justifyContent="right">
                <AmountInput
                    className="pagination__input uk-margin-small-right"
                    inputMode="decimal"
                    readOnly={disabled}
                    type="text"
                    value={value}
                    onKeyUp={onKeyUp}
                    showMaxButton={false}
                />
                <Text className="uk-margin-small-right">
                    page of
                    {totalPages}
                </Text>
                <Card>
                    <Button
                        className="uk-margin-small-right" type="default" onClick={onPrev}
                        disabled={disabled || currentPage === 1}
                    >
                        Prev
                    </Button>
                    <Button type="default" onClick={onNext} disabled={disabled || currentPage === totalPages}>Next</Button>
                </Card>
            </Flex>
        </div>
    )
})
