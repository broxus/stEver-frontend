import * as React from 'react'
import { Observer, observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Button, Icon } from '@broxus/react-uikit'

import { Component } from '@/components/common/Component'
import { Logo } from '@/components/layout/Logo'
import { DeviceNav } from '@/components/layout/DeviceNav'

import { Drawer, DrawerRef } from '../common/Drawer'

import "./Header.scss"

 function HeaderDrawerInner(): JSX.Element {
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
                            type="link"
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
                                <Logo ratio={1} />
                            </div>

                            <div className="device-drawer-header-inner">
                                <Button
                                    type='text'
                                    className="btn-open-drawer"
                                    onClick={collapse}
                                >
                                    <Icon icon="close" />
                                </Button>
                            </div>
                        </div>
                        <DeviceNav onNavigate={collapse} />
                    </Component>
                </Drawer>
            )}
        </Observer>
    )
}

export const HeaderDrawer = observer(HeaderDrawerInner)
