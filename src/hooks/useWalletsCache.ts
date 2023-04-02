import { inheritTextStyle, successLabelStyle, TokensWalletsCache } from '@broxus/js-core'
import { debug } from '@broxus/js-utils'
import { type ProviderRpcClient } from 'everscale-inpage-provider'

let service: TokensWalletsCache

export function useWalletsCache(provider: ProviderRpcClient): TokensWalletsCache {
    if (service === undefined) {
        service = new TokensWalletsCache(provider)
        if (process.env.NODE_ENV !== 'production') {
            debug(
                '%cTokensWalletsCache%c Service has been created',
                successLabelStyle,
                inheritTextStyle,
            )
        }
    }
    return service
}
