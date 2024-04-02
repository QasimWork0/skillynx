import React, { useContext } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import MobileCarousel from './MobileCarousel'
import LibrarySkillCardMobile from './cards/LibrarySkillCardMobile'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import { LibraryPropType } from 'entities/interfaces'
import BookSkillCard from 'ui/components/pages/library/cards/BookSkillCard'

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '1.8rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexShrink: 0,
}))

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bolder',
    padding: '0 0.4rem',
    marginBottom: '0.8rem'
}))

const TrendingMobile = ({courses}:LibraryPropType) => {
    const { t } = useTranslation()
    const { state: selectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <Wrapper>
            <Title fontSize={TextSizes[textSize].title2}>{t('Wellcome back')}, {window.localStorage.getItem("currentUserName")?.split(' ')[0]}!</Title>
            {
                courses.length > 0 && (
                    <MobileCarousel title={'Trending'} onShowMore={()=>{}}>
                        {courses.map((d, i) => (
                            <LibrarySkillCardMobile key={i} data={{ ...d, ratings: 5, ratingsCount: 100 }} />
                        ))}
                    </MobileCarousel>
                )
            }
            {
                courses.length > 0 && (
                    <MobileCarousel title={'Categories'} onShowMore={()=>{}} count={1}>
                        {courses.map((d, i) => (
                            <LibrarySkillCardMobile key={i} data={{ ...d, ratings: 5, ratingsCount: 100 }} isCategory/>
                        ))}
                    </MobileCarousel>
                )
            }
            {
                courses.length > 0 && (
                    <MobileCarousel title={'Best Rated'} onShowMore={()=>{}}>
                        {courses.map((d, i) => (
                            <LibrarySkillCardMobile key={i} data={{ ...d, ratings: 5, ratingsCount: 100 }} />
                        ))}
                    </MobileCarousel>
                )
            }
            {selectedSkill && <BookSkillCard />}
        </Wrapper>
    )
}

export default TrendingMobile