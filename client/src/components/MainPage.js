import React from 'react'
import InfoSection from './InfoSection';
import Pricing from './Pricing';
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from './Data';

export default function MainPage() {
    return (
        <>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
            <Pricing />
            <InfoSection {...homeObjFour} />
        </>
    )
}
