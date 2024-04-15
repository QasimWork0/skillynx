import React, { useContext } from 'react'
import { Box, Button, IconButton, Rating, Typography, alpha, styled, useTheme } from '@mui/material'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import ImageComponent from 'ui/components/shared/ImageComponent'
import RightArrowIcon from 'assets/icons/chevron-right.png'
import CrossIcon from 'assets/icons/cross.png'
import { useTranslation } from 'react-i18next'
import { MobileWidth, TextSizes } from 'entities/constants'
import WithBookSkillData from 'ui/containers/library/BookSkillContainer'
import { BookingCardPropType } from 'entities/interfaces'
import useScreenSize from 'hooks/ScreenSize'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.1) : alpha(theme.palette.common.white, 0.6),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '999999',
    display: 'flex',
    justifyContent: 'flex-end',

}))

const PopUp = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : '#fff',
    width: '33.125rem',
    maxWidth: '100%',
    height: '100%',
    borderRadius: ' 0.75rem 0px 0px 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))

const HeaderBox = styled(Box)(({ theme }) => ({
    height: '5rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
}))

const HeaderText = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.contrastText
}))

const SkillBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: '1',
    backgroundColor: theme.palette.grey[300],
    gap: '1rem',
    overflowY: 'hidden',
}))

const ScrollBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: '1',
    padding: '0rem 2rem 0rem 2rem',
    gap: '1rem',
    overflowY: 'scroll',
    "&::-webkit-scrollbar": {
        width: "0.4rem",
        height: '0.4rem',
    },
    "&::-webkit-scrollbar-track": {
        background: theme.palette.grey[300],
    },
    "&::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.main,
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: theme.palette.grey[700],
    },
}))

const LabelBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start'
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[400],
    flexGrow: 1,
}))

const RatingsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
}))

const RatingsText = styled(Typography)(({ theme }) => ({
    marginLeft: '0.25rem',
    fontWeight: 700,
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[400]
}))

const RatingsCount = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[400]
}))


const Sublabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,
    fontWeight: 400
}))

const Text = styled(Sublabel)(({ theme }) => ({
    width: '100%',
}))

const Label2 = styled(Text)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[400]
}))

const BookButton = styled(Button)(({ theme }) => ({
    width: '11.125rem',
    alignSelf: 'flex-start',
    borderRadius: '3.5rem',
    textTransform: 'none',
    fontWeight: 700,
    margin: '0rem 2rem 1rem 2rem',
}))

const ChaptersBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexGrow: 1
}))

const BookSkillCard = ({ bookCourse }: BookingCardPropType) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: selectedSkill, updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)
    const { width } = useScreenSize()


    const handleBooking = async () => {

        if (selectedSkill) {
            const resp = await bookCourse(selectedSkill.id)
            if (resp.status === 200) {
                setSelectedSkill(undefined)
            }
        }
    }

    return (
        <>
            {selectedSkill &&
                <Wrapper>
                    <Box onClick={() => setSelectedSkill(undefined)} sx={{ flexGrow: '1', height: '100%' }} />
                    <PopUp>
                        <HeaderBox padding={`0.25rem ${width <= MobileWidth ? 2:1.25}rem`}
                            flexDirection={width <= MobileWidth ? 'row-reverse' : 'row'}
                            justifyContent={width <= MobileWidth ? 'space-between' : 'flex-start'}
                        >
                            <IconButton onClick={() => setSelectedSkill(undefined)}>
                                <ImageComponent src={width <= MobileWidth ? CrossIcon : RightArrowIcon} alt='hide' />
                            </IconButton>
                            <HeaderText fontSize={TextSizes[textSize].title3}>{t('What to expect')}</HeaderText>
                        </HeaderBox>
                        <ImageComponent src={selectedSkill.image} alt='skill image' width='100%' height={width <= MobileWidth ? '13rem' : '18.75rem'} objectFit/>
                        <SkillBox>
                            <Box sx={{ padding: '2rem 2rem 0rem 2rem' }}>
                                <LabelBox>
                                    <Label fontSize={TextSizes[textSize].title1} lineHeight={TextSizes[textSize].title1}>{selectedSkill.title}</Label>
                                    <RatingsBox>
                                        <Rating name="half-rating" max={1} value={selectedSkill.ratings === 5 ? selectedSkill.ratings > 1 ? 1 : 0 : 0.5} precision={0.1} readOnly size='large' />
                                        <RatingsText fontSize={TextSizes[textSize].title3}>{selectedSkill.ratings.toFixed(1)}</RatingsText>
                                        <RatingsCount fontSize={TextSizes[textSize].footnote}>{`(${selectedSkill.ratingsCount.toLocaleString().replace(',', '.')})`}</RatingsCount>
                                    </RatingsBox>
                                </LabelBox>
                                <Sublabel fontSize={TextSizes[textSize].subhead}>{selectedSkill.subtitle}</Sublabel>
                            </Box>
                            <ScrollBox>
                                <Text fontSize={TextSizes[textSize].subhead} >{decodeURIComponent(selectedSkill.description)}</Text>
                                <ChaptersBox>
                                    <Label2 fontSize={TextSizes[textSize].title3}>Chapter overview:</Label2>
                                    <ChaptersBox sx={{ gap: '0.25rem' }}>
                                        {
                                            selectedSkill.chapters.map((name, index) => (
                                                <Text key={index} fontSize={TextSizes[textSize].subhead}>{index + 1}. {name}</Text>
                                            ))
                                        }
                                    </ChaptersBox>
                                </ChaptersBox>
                            </ScrollBox>
                            <BookButton variant='contained' onClick={handleBooking}
                                color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                                sx={{ fontSize: TextSizes[textSize].body }}>
                                {t('Book now')}
                            </BookButton>
                        </SkillBox>
                    </PopUp>
                </Wrapper>
            }
        </>
    )
}

export default WithBookSkillData(BookSkillCard)