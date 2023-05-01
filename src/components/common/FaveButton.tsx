import * as React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useFavoritePools } from '@/stores/FavoritePairs';
import { Button, Icon } from '@broxus/react-uikit';
import './FaveButton.scss'

type Props = {
    iconRatio?: number;
    poolAddress: string;
}

function FaveButtonInternal(props: Props): JSX.Element {
    const { iconRatio, poolAddress } = props

    const favoritePools = useFavoritePools()

    if (!favoritePools.isConnected) {
        return <>&nbsp;</>
    }

    const onClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault()
        favoritePools.toggle(poolAddress)
    }

    return (
        <Button
            className={classNames('btn-fav', 'btn-icon', {
                active: favoritePools.addresses.includes(poolAddress),
            })}
            onClick={onClick}
        >
            {/* <Icon icon="star" ratio={iconRatio} /> */}
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="19.200000000000003" width="19.200000000000003"><path d="M14.6258 8.82306L14.7857 9.24051L15.2317 9.27097L22.2779 9.7522L16.8465 14.5363L16.5284 14.8165L16.6294 15.2283L18.3978 22.4392L12.3794 18.4874L11.9952 18.2351L11.611 18.4874L5.59272 22.4392L7.36114 15.2283L7.46204 14.8168L7.14433 14.5366L1.72029 9.7522L8.75876 9.27096L9.20473 9.24047L9.36467 8.82306L11.9952 1.95785L14.6258 8.82306Z" stroke="currentColor" stroke-width="1.4"></path></svg>
        </Button>
    )
}

export const FaveButton = observer(FaveButtonInternal)
