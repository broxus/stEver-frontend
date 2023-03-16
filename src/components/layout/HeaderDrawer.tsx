import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Button, Drawer, Icon } from '@broxus/react-uikit'

import { Component } from '@/components/common/Component'
import { Logo } from '@/components/layout/Logo'


export function HeaderDrawer(): JSX.Element {
    const intl = useIntl()

    return (
        <Observer>
            {() => (
                <Drawer
                    closable
                    destroyOnClose
                    /* eslint-disable-next-line react/no-unstable-nested-components */
                    trigger={({ expand }) => (
                        <Button
                            // type="icon"
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

                            {/* <div className="device-drawer-header-inner">
                                {wallet.isConnected && (
                                    <EverWallet showDisconnectButton={false} />
                                )}

                                <Button
                                    type="icon"
                                    className="btn-close-drawer"
                                    onClick={collapse}
                                >
                                    <Icon icon="close" />
                                </Button>
                            </div> */}
                        </div>
                        {/* <DeviceNav onNavigate={collapse} /> */}
                    </Component>
                </Drawer>
            )}
        </Observer>
    )
}
