import * as React from 'react'
import {
    Flex, Grid, Text, Tile,
} from '@broxus/react-uikit'
import { makeArray } from '@broxus/js-utils'
import { getUniqueId } from 'everscale-inpage-provider/dist/utils'

import { Placeholder } from '@/components/common/Placeholder'

type Props = {
    rowsCount?: number;
}

export function PoolsListMobilePlaceholder({ rowsCount }: Props): JSX.Element {
    const placeholder = React.useRef(makeArray(rowsCount ?? 10, getUniqueId))
    return (
        <table className="uk-table uk-table-divider uk-width-1-1 table">
            {placeholder.current.map(key => (
                <Tile className="listCard uk-padding-small">
                    <Grid childWidth={1} gap="xsmall">
                        <Flex justifyContent="between">
                            <Text className="uk-margin-auto-vertical listCard--title">
                                <Placeholder height={20} width={100} />
                            </Text>
                            <Text className="uk-margin-auto-vertical">
                                <Placeholder height={20} width={100} />
                            </Text>
                        </Flex>
                        <Flex justifyContent="between">
                            <Text className="uk-margin-auto-vertical listCard--title" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                            <Text className="uk-margin-auto-vertical" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                        </Flex>
                        <Flex justifyContent="between">
                            <Text className="uk-margin-auto-vertical listCard--title" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                            <Text className="uk-margin-auto-vertical" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                        </Flex>
                        <Flex justifyContent="between">
                            <Text className="uk-margin-auto-vertical listCard--title" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                            <Text className="uk-margin-auto-vertical" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                        </Flex>
                        <Flex justifyContent="between">
                            <Text className="uk-margin-auto-vertical listCard--title" size="small">
                                <Placeholder height={20} width={100} />
                            </Text>
                            <Text className="uk-margin-auto-vertical">
                                <Placeholder height={20} width={100} />
                            </Text>
                        </Flex>
                    </Grid>
                </Tile>
            ))}
        </table>
    )
}
