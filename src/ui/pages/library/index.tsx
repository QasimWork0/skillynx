import React from 'react'
import Trending from 'ui/components/pages/library/menu/Trending'
import useScreenSize from 'hooks/ScreenSize'
import { MobileWidth } from 'entities/constants'
import TrendingMobile from 'ui/components/mobile/library/TrendingMobile'
import Header from 'ui/components/shared/Header'

const Library = () => {
    const { width } = useScreenSize()

    return (
        <>
            {width > MobileWidth ? (
                <>
                    <Header />
                    <Trending />
                </>
            ) : (
                <TrendingMobile />
            )}
        </>
    )
}

export default Library