import React, { useContext } from 'react'
import { Box, Typography, styled } from '@mui/material'
import BackgroundLogin from 'assets/images/Background_Login.png'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import MobileCarousel from './MobileCarousel'
import BookSkillCardMobile from './cards/BookSkillCardMobile'
import LibrarySkillCardMobile from './cards/LibrarySkillCardMobile'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '1.8rem 0.6rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
    gap: '1.4rem',
}))

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bolder',
    padding: '0 0.4rem',
    marginBottom: '0.8rem'
}))

const TrendingMobile = () => {
    const { t } = useTranslation()
    const { state: selectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)

    const dataset = [
        {
            image: BackgroundLogin,
            label: 'Ideation',
            sublabel: 'Develop great ideas',
            ratings: 4.6,
            ratingsCount: 14544
        },
        {
            image: BackgroundLogin,
            label: 'Learn to learn',
            sublabel: 'Learn efficiently',
            ratings: 4.8,
            ratingsCount: 4854
        },
        {
            image: BackgroundLogin,
            label: 'Negotiation',
            sublabel: 'Be a negotiation pro',
            ratings: 5.0,
            ratingsCount: 19312
        },
        {
            image: BackgroundLogin,
            label: 'Empathy',
            sublabel: 'Connect on a Deeper Level',
            ratings: 4.5,
            ratingsCount: 1314
        },
        {
            image: BackgroundLogin,
            label: 'Home Office',
            sublabel: 'Information',
            ratings: 4.8,
            ratingsCount: 4854
        },
        {
            image: BackgroundLogin,
            label: 'Empathy',
            sublabel: 'Connect on a Deeper Level',
            ratings: 4.5,
            ratingsCount: 1314
        },
        {
            image: BackgroundLogin,
            label: 'Home Office',
            sublabel: 'Information',
            ratings: 4.8,
            ratingsCount: 4854
        },
    ]

    return (
        <Wrapper>
            <Title fontSize={TextSizes[textSize].title2}>{t('Wellcome back, Martina!')}</Title>
            {
                dataset.length > 0 && (
                    <MobileCarousel title={'Trending'} onShowMore={()=>{}}>
                        {dataset.map((d, i) => (
                            <LibrarySkillCardMobile key={i} data={d} />
                        ))}
                    </MobileCarousel>
                )
            }
            {
                dataset.length > 0 && (
                    <MobileCarousel title={'Categories'} onShowMore={()=>{}} count={1}>
                        {dataset.map((d, i) => (
                            <LibrarySkillCardMobile key={i} data={d}/>
                        ))}
                    </MobileCarousel>
                )
            }
            {selectedSkill && <BookSkillCardMobile />}
        </Wrapper>
    )
}

export default TrendingMobile