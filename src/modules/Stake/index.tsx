import * as React from 'react'

import { InfoStak } from '@/modules/Stake/components/infoStak'
import { FormStak } from '@/modules/Stake/components/formStak'
import { FaqStak } from '@/modules/Stake/components/faqStak'


export function Stak(): JSX.Element {
    return (
        <div className="container container--small">
            <InfoStak />
            <FormStak />
            <FaqStak />
        </div>
    )
}
