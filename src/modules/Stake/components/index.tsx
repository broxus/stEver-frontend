import * as React from 'react'

import { InfoStak } from './InfoStak'
import { FormStak } from './FormStak'
import { FaqStak } from './FaqStak'

export function Stak(): JSX.Element {
    return (
        <div className="container container--small">
            <InfoStak />
            <FormStak />
            <FaqStak />
        </div>
    )
}
