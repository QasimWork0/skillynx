import { Box, styled } from '@mui/material'
import React, { useContext } from 'react'
import Carousel from '../Carousel'
import LibrarySkillCard from '../cards/LibrarySkillCard'
import BookSkillCard from '../cards/BookSkillCard'
import { SelectedSkillContext } from 'data/index'
import { LibraryPropType } from 'entities/interfaces'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { useTranslation } from 'react-i18next'
import useScreenSize from 'hooks/ScreenSize'

const Wrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    padding: '2.4rem 1.3rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
      height: '0.4rem',
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.secondary.main,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.dark,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.grey[700],
    },
    margin: '0.1rem',
}))

const QuoteBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode==='light'? theme.palette.common.white: theme.palette.grey[900],
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    gap: '2.125rem',
    borderRadius: '0.75rem',
    padding: '1.6875rem',
    boxShadow: theme.palette.mode==='light'? '0px 0px 1px 0px rgba(144, 132, 174, 0.10), 0px 2px 2px 0px rgba(144, 132, 174, 0.09), 0px 4px 2px 0px rgba(144, 132, 174, 0.05), 0px 6px 3px 0px rgba(144, 132, 174, 0.01), 0px 10px 3px 0px rgba(144, 132, 174, 0.00)':'',
}))

const QuoteTextBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
}))

const QuoteText = styled(Box)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 400
}))

const QuoteAuthor = styled(Box)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 500
}))

const Trending = ({ courses }: LibraryPropType) => {
    const { state: selectedSkill } = useContext(SelectedSkillContext)
    const {t} = useTranslation()
    const {width} = useScreenSize()

    return (
        <Wrapper>
            <Box sx={{ width: '100%', display:'flex', gap:'2.875rem' }}>    
                <QuoteBox sx={{width:width > 1550? '50%':'100%'}}>
                    <QuoteTextBox>
                        <QuoteText>„{t('Oh dear! Oh dear!')}<br/>&nbsp;{t('shall be too late!')}“</QuoteText>
                        <QuoteAuthor>- {t('The white rabbit')}</QuoteAuthor>
                    </QuoteTextBox>
                    <ImageComponent width='12.375rem' height='13.5625rem' src='https://s3-alpha-sig.figma.com/img/7b10/2264/8a0ff2119e9e283f527ee2da237eb1a3?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BuJ--XbDzVMydQmQQPsQVQ2I4dfcbQpyzQzg33cBHuj~rmvG7zYVMkcVc6mDdVB1JO63nZYB7Hsd~oj5MzSt1V~6hRR~M6y-hfaOImmsBBt5pPUbRulie48qu6w6wYZl6UNdguiTZlzTMT1f8wA2z5PxDXXMNEVFsMl2mVSF1pULqru~9uBARB-Kdnx~-QhQw4pvu06glAIYI2dR5PsDw2a9Yky9TTGAwvQIOS1-7s2YJFS-D8AgsFlWmS7R2RE44xNcxFFHfUvTn6d~-HU~yElpq-nEfkHSduWnSrLrnrbKqzOYqImg7LGPDy87SUYQoVXi0epyXpQ44bm9dmg2cw__' alt='image' />
                </QuoteBox>
                {width > 1550 &&
                    <QuoteBox>
                    <QuoteTextBox>
                        <QuoteText>„{t('Oh dear! Oh dear!')}<br/>&nbsp;{t('shall be too late!')}“</QuoteText>
                        <QuoteAuthor>- {t('The white rabbit')}</QuoteAuthor>
                    </QuoteTextBox>
                    <ImageComponent width='12.375rem' height='13.5625rem' src='https://s3-alpha-sig.figma.com/img/7b10/2264/8a0ff2119e9e283f527ee2da237eb1a3?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BuJ--XbDzVMydQmQQPsQVQ2I4dfcbQpyzQzg33cBHuj~rmvG7zYVMkcVc6mDdVB1JO63nZYB7Hsd~oj5MzSt1V~6hRR~M6y-hfaOImmsBBt5pPUbRulie48qu6w6wYZl6UNdguiTZlzTMT1f8wA2z5PxDXXMNEVFsMl2mVSF1pULqru~9uBARB-Kdnx~-QhQw4pvu06glAIYI2dR5PsDw2a9Yky9TTGAwvQIOS1-7s2YJFS-D8AgsFlWmS7R2RE44xNcxFFHfUvTn6d~-HU~yElpq-nEfkHSduWnSrLrnrbKqzOYqImg7LGPDy87SUYQoVXi0epyXpQ44bm9dmg2cw__' alt='image' />
                </QuoteBox>
                }
            </Box>
            <Box sx={{ width: '100%', flexGrow:'1'}}>
                {
                    courses.length > 0 && (
                        <Carousel>
                            {courses.map((d, i) => (
                                <LibrarySkillCard key={i} data={{ ...d, ratings: 5, ratingsCount: 100 }} />
                            ))}
                        </Carousel>
                    )
                }
            </Box>
            {selectedSkill && <BookSkillCard />}
        </Wrapper>
    )
}

export default Trending