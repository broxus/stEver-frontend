import {
    TvmWalletService,
    inheritTextStyle,
    onlyTvmNetworks,
    successLabelStyle,
} from '@broxus/js-core'
import { debug } from '@broxus/js-utils'

// import { networks } from '@/assets/networks'

let service: TvmWalletService

export function useTvmWallet(): TvmWalletService {
    if (service === undefined) {
        service = new TvmWalletService({
            defaultNetworkId: 42,
            minWalletVersion: '0.2.34',
            // networks: onlyTvmNetworks(networks),
        })
        debug(
            `%c${service.constructor.name}%c has been created and ready to connect to TVM-compatible wallet`,
            successLabelStyle,
            inheritTextStyle,
        )
    }
    return service
}
