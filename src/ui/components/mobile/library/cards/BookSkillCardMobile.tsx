import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import React, { useContext } from 'react'
import ImageComponent from 'ui/components/shared/ImageComponent'
import CloseIcon from 'assets/icons/times-square-Bold_1_.png'
import ShoppingBasketIcon from 'assets/icons/shopping-basket-Bold_1_.png'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    right: '0',
    top: '6rem',
    bottom: '0',
    left: '0',
    zIndex: '99999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2.4rem 1.1rem'
}))

const HideButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    alignSelf: 'flex-end',
    border: '1rem'
}))

const LabelBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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

const BookSkillCardMobile = () => {
    const { t } = useTranslation()
    const { state: selectedSkill, updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <>
            {selectedSkill &&
                <Wrapper>
                    <LabelBox>
                        <HideButton onClick={() => setSelectedSkill(undefined)}>
                            <ImageComponent src={CloseIcon} alt='hide' width='2.5rem' height='auto' filterAllowed />
                        </HideButton>
                        <Label fontSize={TextSizes[textSize].title1}>{selectedSkill.label}</Label>
                    </LabelBox>
                    <ImageComponent src={selectedSkill.image} alt='skill image' width='13rem' height='13rem' />
                    <LabelLeft fontSize={TextSizes[textSize].title2}>{t('What to expect')}:</LabelLeft>
                    <Text fontSize={TextSizes[textSize].body}>Negociation is a big part of our daily routine.<br /> That is why this skill is one of the most important.<br /><br /> Learn what it takes to be a negotiation expert!</Text>
                    <Label2 fontSize={TextSizes[textSize].body}>{t('Chapter overview')}:</Label2>
                    <Text fontSize={TextSizes[textSize].body}>
                        1. Prepare your negotiations<br />
                        2. Conduct of negotiations<br />
                        3. Follow ups<br />
                        4. Harward Method<br />
                        5. Salary negotiation<br />
                        6. Price negotiation<br />
                    </Text>
                    <BookButton variant='contained' color='secondary'>
                        <ImageComponent src={ShoppingBasketIcon} alt='icon' filterAllowed />
                        <BookButtonText fontSize={TextSizes[textSize].body}>{t('Book now')}</BookButtonText>
                    </BookButton>
                </Wrapper>
            }
        </>
    )
}

export default BookSkillCardMobile