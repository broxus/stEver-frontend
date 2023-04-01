import * as React from 'react'
import { camelify, camelToSnake, formattedTokenAmount } from '@broxus/js-utils'
import {
    type DefaultLibraryType,
    ExplorerAccountLink,
    Icon,
    Skeleton,
    WalletAccount,
} from '@broxus/react-components'
import {
    Button,
    Dropdown,
    type DropRef,
    Flex,
    Grid,
    Icon as MaterialIcon,
    List,
} from '@broxus/react-uikit'
import classNames from 'classnames'
import { Observer, observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { ConnectButton, useTvmWalletContext } from '@broxus/react-modules'
import messages from './intl/index'


export type TvmConnectorProps = {
    changeAccountButtonText?: React.ReactNode
    changeNetworkButtonText?: React.ReactNode
    connectButtonText?: React.ReactNode
    disconnectButtonText?: React.ReactNode
    popupType?: 'drawer' | 'modal'
    showSubIcon?: boolean
    standalone?: boolean
}

export const TvmConnector = observer((props: TvmConnectorProps) => {
    const intl = useIntl()
    const { wallet } = useTvmWalletContext()

    const drop = React.useRef<DropRef>(null)

    const {
        changeAccountButtonText = intl.formatMessage(messages.WALLET_CHANGE_ACCOUNT_BTN_TEXT),
        changeNetworkButtonText = intl.formatMessage(messages.WALLET_CHANGE_NETWORK_BTN_TEXT),
        connectButtonText = intl.formatMessage(messages.WALLET_CONNECT_BTN_TEXT),
        disconnectButtonText = intl.formatMessage(messages.WALLET_DISCONNECT_BTN_TEXT),
        popupType,
        showSubIcon = true,
        standalone,
    } = props

    const changeAccount = async (): Promise<void> => {
        if (wallet.hasProvider) {
            drop.current?.close()
            await wallet.provider.changeAccount()
        }
    }

    const changeNetwork = async (): Promise<void> => {
        if (wallet.hasProvider) {
            drop.current?.close()
            // await wallet.provider.changeNetwork?.()
        }
    }

    const disconnect = async (): Promise<void> => {
        if (wallet.hasProvider) {
            drop.current?.close()
            await wallet.disconnect()
        }
    }

    return (
        <Flex
            alignItems="middle"
            className={classNames('uk-wallet-connector', wallet.providerId)}
            component={Grid}
            gap="small"
            justifyContent="between"
        >
            <Observer>
                {() => {
                    const isDisconnected = !wallet.isConnected || wallet.address === undefined
                    const icon = `tvm${wallet.networkId}BlockchainIcon` as keyof DefaultLibraryType
                    const service = wallet.providerId === 'everscale'
                        ? 'everWallet'
                        : `${wallet.providerId.toLowerCase()}Wallet`
                    const walletIcon = `${camelify(
                        camelToSnake(service),
                    )}Icon` as keyof DefaultLibraryType
                    let subTitle: React.ReactNode = intl.formatMessage(messages.WALLET_NOT_CONNECTED_HINT)
                    if (wallet.isInitializing) {
                        subTitle = intl.formatMessage(messages.WALLET_INITIALIZING_HINT)
                    }
                    else if (wallet.isSyncing) {
                        subTitle = <Skeleton width={80} />
                    }
                    else if (wallet.isReady) {
                        subTitle = `${formattedTokenAmount(
                            wallet.balance,
                            wallet.currency.decimals,
                        )} ${wallet.currency.symbol}`
                    }

                    return (
                        <>
                            <div>
                                <WalletAccount
                                    address={wallet.address?.toString()}
                                    icon={<Icon icon={icon} ratio={1.6} />}
                                    subIcon={
                                        !isDisconnected && showSubIcon ? (
                                            <Icon icon={walletIcon} ratio={0.8} />
                                        ) : undefined
                                    }
                                    subTitle={subTitle}
                                    title={isDisconnected
                                        ? intl.formatMessage(messages.TVM_WALLET_CONNECTOR_BLOCKCHAIN_NAME)
                                        : (
                                            <ExplorerAccountLink
                                                address={wallet.address?.toString()}
                                                baseUrl={wallet.network?.explorer.baseUrl}
                                                copyable
                                                subPath={wallet.network?.explorer.accountsSubPath}
                                                tooltip={intl.formatMessage(
                                                    messages.TVM_WALLET_CONNECTOR_EXPLORER_HINT,
                                                    {
                                                        explorerTitle:
                                                            wallet.network?.explorer.title ?? '',
                                                    },
                                                )}
                                            />
                                        )
                                    }
                                />
                            </div>
                            <div className="uk-position-relative">
                                {!isDisconnected && (
                                    <Dropdown
                                        ref={drop}
                                        overlayClassName="uk-wallet-connector-dropdown"
                                        overlay={(
                                            <List className="uk-margin-remove" size="large">
                                                <List.Item>
                                                    <Button
                                                        className="uk-button-change-account"
                                                        type="link"
                                                        onClick={changeAccount}
                                                    >
                                                        {changeAccountButtonText}
                                                    </Button>
                                                </List.Item>
                                                <List.Item>
                                                    <Button
                                                        className="uk-button-change-network"
                                                        disabled
                                                        type="link"
                                                        onClick={changeNetwork}
                                                    >
                                                        {changeNetworkButtonText}
                                                    </Button>
                                                </List.Item>
                                                <List.Item>
                                                    <Button
                                                        aria-disabled={wallet.isDisconnecting}
                                                        className="uk-button-logout"
                                                        disabled={wallet.isDisconnecting}
                                                        type="link"
                                                        onClick={disconnect}
                                                    >
                                                        {disconnectButtonText}
                                                    </Button>
                                                </List.Item>
                                            </List>
                                        )}
                                        placement="bottom-right"
                                        trigger="click"
                                    >
                                        <MaterialIcon.Link icon="more_vert" />
                                    </Dropdown>
                                )}
                                {isDisconnected && (
                                    <ConnectButton
                                        key="connect"
                                        popupType={popupType}
                                        standalone={standalone}
                                    >
                                        {connectButtonText}
                                    </ConnectButton>
                                )}
                            </div>
                        </>
                    )
                }}
            </Observer>
        </Flex>
    )
})
