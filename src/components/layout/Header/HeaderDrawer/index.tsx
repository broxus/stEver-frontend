import * as React from 'react'
import { reaction } from 'mobx'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'
import { Component } from '@/components/common/Component'
import { Logo } from '@/components/layout/Logo'
// import { EverWallet } from '@/modules/Accounts'
import { DeviceNav } from '@/components/layout/DeviceNav'
import { Drawer, DrawerRef } from '@/components/common/Drawer'


export function HeaderDrawer(): JSX.Element {
    const intl = useIntl()

    const drawer = React.useRef<DrawerRef | null>(null)

    const collapse = () => {
        drawer.current?.collapse()
    }

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
                            type="icon"
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
                        <DeviceNav onNavigate={collapse} />
                    </Component>
                </Drawer>
            )}
        </Observer>
    )
}
