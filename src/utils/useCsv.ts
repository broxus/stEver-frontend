import React from 'react'

export function useCsv(headers: string[], data: (string | number)[][]): string {
    return React.useMemo(
        () => {
            let result = `${headers.map(item => `"${item}"`).join(';')}\n`

            data.forEach(items => {
                for (let i = 0; i < items.length; i++) {
                    result += i !== items.length - 1 ? `${items[i]};` : `${items[i]};\n`
                }
            })

            return result
        },
        [headers, data],
    )
}
