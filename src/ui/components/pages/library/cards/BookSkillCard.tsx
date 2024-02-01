import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import React, { useContext } from 'react'
import ImageComponent from 'ui/components/shared/ImageComponent'
import RightArrowIcon from 'assets/icons/arrow-right-Bold_1_.png'
import ShoppingBasketIcon from 'assets/icons/shopping-basket-Bold_1_.png'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    right: '0',
    top: '6.6rem',
    bottom: '0',
    borderRadius: '0 0 0 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem 1.1rem'
}))

const HideButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    alignSelf: 'flex-start',
}))

const LabelBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.common.white
}))

const LabelLeft = styled(Label)(({ theme }) => ({
    width: '100%',
}))

const Sublabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
}))

const Text = styled(Sublabel)(({ theme }) => ({
    width: '100%',
}))

const Label2 = styled(Text)(({ theme }) => ({
    alignSelf: 'flex-start',
    fontWeight: 'bold'
}))

const BookButton = styled(Button)(({ theme }) => ({
    alignSelf: 'flex-end',
    borderRadius: '0.6rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 1rem'
}))

const BookButtonText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginLeft: '0.8rem',
}))

const BookSkillCard = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: selectedSkill, updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <>
            {selectedSkill &&
                <Wrapper>
                    <HideButton onClick={() => setSelectedSkill(undefined)}>
                        <ImageComponent src={RightArrowIcon} alt='hide' width='2.5rem' height='2rem' filterAllowed/>
                    </HideButton>
                    <ImageComponent src={selectedSkill.image} alt='skill image'
                        width='42%' height='10rem' borderRadius='2rem 2rem 0 0' border={`0.25rem solid ${theme.palette.common.white}`} />
                    <LabelLeft fontSize={TextSizes[textSize].title3}>What to expect:</LabelLeft>
                    <LabelBox>
                        <Label fontSize={TextSizes[textSize].title3}>{selectedSkill.label}</Label>
                        <Sublabel fontSize={TextSizes[textSize].body}>{selectedSkill.sublabel}</Sublabel>
                    </LabelBox>
                    <Text fontSize={TextSizes[textSize].body}>Negociation is a big part of our daily routine.<br /> That is why this skill is one of the most important.<br /> Learn what it takes to be a negotiation expert!</Text>
                    <Label2 fontSize={TextSizes[textSize].body}>Chapter overview:</Label2>
                    <Text fontSize={TextSizes[textSize].body}>
                        1. Prepare your negotiations<br />
                        2. Conduct of negotiations<br />
                        3. Follow ups<br />
                        4. Harward Method<br />
                        5. Salary negotiation<br />
                        6. Price negotiation<br />
                    </Text>
                    <BookButton variant='contained' color='secondary'>
                        <ImageComponent src={ShoppingBasketIcon} alt='icon' filterAllowed/>
                        <BookButtonText fontSize={TextSizes[textSize].body}>{t('Book now')}</BookButtonText>
                    </BookButton>
                </Wrapper>
            }
        </>
    )
}

export default BookSkillCard