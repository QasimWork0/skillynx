import React from 'react'
import Trending from 'ui/components/pages/library/menu/Trending'
import useScreenSize from 'hooks/ScreenSize'
import { MobileWidth } from 'entities/constants'
import TrendingMobile from 'ui/components/mobile/library/TrendingMobile'
import Header from 'ui/components/shared/Header'
import WithLibraryData from 'ui/containers/library'
import { LibraryPropType } from 'entities/interfaces'

const Library = ({courses}:LibraryPropType) => {
    const { width } = useScreenSize()

    return (
        <>
            {width > MobileWidth ? (
                <>
                    <Header />
                    <Trending courses={courses}/>
                </>
            ) : (
                <TrendingMobile courses={courses}/>
            )}
        </>
    )
}

export default WithLibraryData(Library)