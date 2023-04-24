import {
    type AllNetworksConfigs,
    TvmWalletService,
    inheritTextStyle,
    onlyTvmNetworks,
    successLabelStyle,
} from '@broxus/js-core'
import { debug } from '@broxus/js-utils'
import { AddressLiteral } from 'everscale-inpage-provider'

import { WEVERRootAddress } from '@/config'

// import { networks } from '@/assets/networks'

let service: TvmWalletService
const networks: AllNetworksConfigs[] = [
    {
        chainId: '42',
        currency: {
            decimals: 9,
            icon: 'https://app.flatqube.io/assets/992f1244bd3cbc67afa8.svg',
            name: 'Native currency',
            symbol: 'EVER',
            wrappedCurrencyAddress: new AddressLiteral(WEVERRootAddress),
        },
        explorer: {
            accountsSubPath: 'accounts',
            baseUrl: 'https://everscan.io',
            title: 'Everscan',
            transactionsSubPath: 'transactions',
        },
        id: 'tvm-42',
        name: 'Everscale',
        provider: 'everscale',
        rpcUrl: '',
        shortName: 'Everscale',
        type: 'tvm',
    },
    {
        badge: 'Soon',
        chainId: '1000',
        currency: {
            decimals: 9,
            icon: 'https://raw.githubusercontent.com/BVFDT/venom-assets/master/icons/wVENOM/logo.svg',
            name: 'Native currency',
            symbol: 'VENOM',
        },
        explorer: {
            accountsSubPath: 'accounts',
            baseUrl: 'https://venomscan.com',
            title: 'VenomScan',
            transactionsSubPath: 'transactions',
        },
        id: 'tvm-1000',
        name: 'Venom',
        provider: 'venom',
        rpcUrl: '',
        shortName: 'Venom',
        type: 'tvm',
    },
    {
        chainId: '1',
        currency: {
            decimals: 18,
            icon: 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
            name: 'Native currency',
            symbol: 'ETH',
            wrappedCurrencyAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        },
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://etherscan.io',
            title: 'Etherscan',
            transactionsSubPath: 'tx',
        },
        id: 'evm-1',
        name: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        shortName: 'Ethereum',
        transactionType: '0x2',
        type: 'evm',
    },
    {
        chainId: '56',
        currency: {
            decimals: 18,
            icon: 'https://bscscan.com/images/svg/brands/bnb-1.svg?v=1.3',
            name: 'Native currency',
            symbol: 'BNB',
            wrappedCurrencyAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        },
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://bscscan.com',
            title: 'BscScan',
            transactionsSubPath: 'tx',
        },
        id: 'evm-56',
        name: 'BNB Smart Chain',
        rpcUrl: 'https://rpc.ankr.com/bsc/',
        shortName: 'BNB Chain',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '250',
        currency: {
            decimals: 18,
            icon: 'https://ftmscan.com/images/svg/brands/fantom.svg?v=1.3',
            name: 'Native currency',
            symbol: 'FTM',
            wrappedCurrencyAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
        },
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://ftmscan.com',
            title: 'FtmScan',
            transactionsSubPath: 'tx',
        },
        id: 'evm-250',
        name: 'Fantom Opera',
        rpcUrl: 'https://rpc.ankr.com/fantom/',
        shortName: 'Fantom Opera',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '137',
        currency: {
            decimals: 18,
            icon: 'https://polygonscan.com/images/svg/brands/polygon.svg',
            name: 'Native currency',
            symbol: 'MATIC',
            wrappedCurrencyAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
        },
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://polygonscan.com',
            title: 'PolygonScan',
            transactionsSubPath: 'tx',
        },
        id: 'evm-137',
        name: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com/',
        shortName: 'Polygon',
        transactionType: '0x0',
        type: 'evm',
    },
    // {
    //     badge: 'Maybe',
    //     chainId: '42220',
    //     currency: {
    //         decimals: 18,
    //         icon: 'https://celoscan.io/token/images/celonativeasset_32.png',
    //         name: 'Native currency',
    //         symbol: 'CELO',
    //         wrappedCurrencyAddress: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
    //     },
    //     disabled: true,
    //     explorer: {
    //         accountsSubPath: 'address',
    //         baseUrl: 'https://celoscan.io',
    //         title: 'CeloScan',
    //         transactionsSubPath: 'tx',
    //     },
    //     id: 'evm-42220',
    //     name: 'Celo Chain',
    //     rpcUrl: 'https://forno.celo.org',
    //     shortName: 'Celo',
    //     type: 'evm',
    // },
    {
        chainId: '43114',
        currency: {
            decimals: 18,
            icon: 'https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=23.2.2.0',
            name: 'Native currency',
            symbol: 'AVAX',
            wrappedCurrencyAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        },
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://snowtrace.io',
            title: 'SnowTrace',
            transactionsSubPath: 'tx',
        },
        id: 'evm-43114',
        name: 'Avalanche Network',
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        shortName: 'Avalanche',
        type: 'evm',
    },
    {
        badge: 'Maintenance',
        chainId: '2001',
        currency: {
            decimals: 18,
            icon: 'https://cardano-brzidge.milkomeda.com/media/iconMilkomeda.svg',
            name: 'Native currency',
            symbol: 'mADA',
            wrappedCurrencyAddress: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
        },
        disabled: true,
        explorer: {
            accountsSubPath: 'address',
            baseUrl: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com',
            title: 'BlockScout',
            transactionsSubPath: 'tx',
        },
        id: 'evm-2001',
        name: 'Milkomeda C1 Mainnet',
        rpcUrl: 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com',
        shortName: 'Milkomeda C1',
        type: 'evm',
    },
]

export function useTvmWallet(): TvmWalletService {
    if (service === undefined) {
        service = new TvmWalletService({
            defaultNetworkId: 42,
            minWalletVersion: '0.2.34',
            networks: onlyTvmNetworks(networks),
        })
        debug(
            `%c${service.constructor.name}%c has been created and ready to connect to TVM-compatible wallet`,
            successLabelStyle,
            inheritTextStyle,
        )
    }
    return service
}
