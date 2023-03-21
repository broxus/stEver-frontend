import * as React from 'react'
import { useIntl } from 'react-intl'

// import { useTxTypes } from '@/hooks'
import { Checkbox } from '@broxus/react-uikit'
import { TransactionEventType } from '@broxus/js-core'

type Props = {
    paramName?: string;
}

export function TransactionType({
    paramName,
}: Props): JSX.Element {
    const intl = useIntl()
    // const [txTypes, setTxTypes] = useTxTypes(paramName)

    // const onApply = (val: string[]) => {
    //     setTxTypes(val as TransactionEventType[])
    // }

    // const onClear = () => {
    //     setTxTypes([])
    // }

    return (
        <Checkbox
            // checked={txTypes}
            // onApply={onApply}
            // onClear={onClear}
            name={intl.formatMessage({
                id: 'transactions.transaction-type',
            })}
            // items={[{
            //     id: TransactionTypeEnum.Ordinary,
            //     label: intl.formatMessage({
            //         id: 'transaction-type.Ordinary',
            //     }),
            // }, {
            //     id: TransactionTypeEnum.TickTock,
            //     label: intl.formatMessage({
            //         id: 'transaction-type.TickTock',
            //     }),
            // }]}
        />
    )
}
