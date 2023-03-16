import * as React from 'react'
import { reaction } from 'mobx'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { Component } from '@/components/common/Component'
import { Logo } from '@/components/layout/Logo'

import { DeviceNav } from '@/components/layout/DeviceNav'
import { Button, Icon } from '@broxus/react-uikit'
import { Drawer, DrawerRef } from '../common/Drawer'


export function HeaderDrawer(): JSX.Element {
    const intl = useIntl()
    // const wallet = useWallet()

    const drawer = React.useRef<DrawerRef | null>(null)

    const collapse = () => {
        drawer.current?.collapse()
    }

    React.useEffect(() => {
        // const connectionDisposer = reaction(() => wallet.isConnected, () => {
        //     collapse()
        // })
        // return () => {
        //     connectionDisposer?.()
        // }
    }, [])

    return (
        <Observer>
            {() => (
                <Drawer
                    ref={drawer}
                    closable
                    destroyOnClose
                    /* eslint-disable-next-line react/no-unstable-nested-components */
                    trigger={({ expand }) => (
                        <Button
                            type="default"
                            className="btn-open-drawer"
                            onClick={expand}
                        >
                            <Icon icon="menu" />
                        </Button>
                    )}
                    width="100vw"
                >
                    <Component className="device-drawer-content-inner">
                        <div className="device-drawer-header">
                            <div className="logo">
                                <Logo ratio={0.9} />
                            </div>

                            <div className="device-drawer-header-inner">
                                {/* {wallet.isConnected && (
                                    <EverWallet showDisconnectButton={false} />
                                )} */}

                                <Button
                                    type="default"
                                    className="btn-close-drawer"
                                    onClick={collapse}
                                >
                                    <Icon icon="close" />
                                </Button>
                            </div>
                        </div>
                        <DeviceNav onNavigate={collapse} />
                        <div className="device-drawer-footer">
                            {/* <Button
                                block
                                size="md"
                                type={wallet.isConnected ? 'secondary' : 'primary'}
                                onClick={wallet.isConnected
                                    ? wallet.disconnect
                                    : wallet.connect}
                            >
                                {intl.formatMessage({
                                    id: wallet.isConnected
                                        ? 'WALLET_DISCONNECT_BTN_TEXT'
                                        : 'EVER_WALLET_CONNECT_BTN_TEXT',
                                })}
                            </Button> */}
                        </div>
                    </Component>
                </Drawer>
            )}
        </Observer>
    )
}
