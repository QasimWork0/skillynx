import React, { useContext, useState } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SkillynxLogo from 'assets/logos/skillynx_text_logo.png'
import Image1 from 'assets/images/welcomeImage1.png'
import Image2 from 'assets/images/welcomeImage2.png'
import Image3 from 'assets/images/welcomeImage3.png'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { MobileWidth, TextSizes } from 'entities/constants'
import useScreenSize from 'hooks/ScreenSize'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute'
}))

const LogoBox = styled(Box)(() => ({
    position: 'absolute',
    top: '3rem',
    left: '0',
    width: '100%',
    padding: '0 3rem',
    display: 'flex',
}))

const ContentBox = styled(Box)(({ theme }) => ({
    height: '100%',
    padding: '5% 6%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
}))

const DotBox = styled(Box)(({ theme }) => ({
    display: 'flex'
}))

const Dot = styled(Box)<{ isselected?: string }>(({ theme, isselected }) => ({
    backgroundColor: isselected ? theme.palette.primary.main : theme.palette.grey[100] ,
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    margin: '0.3rem'
}))

const Label = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.black,
    textAlign: 'center',
}))

const Text = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    lineHeight: '1.6rem',
    width: '17.8rem',
    height: '6rem',
}))

const NextButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    width: '17rem',
    borderRadius: '2rem',
    marginTop: '1rem',
    fontSize: '1.4rem',
    padding: '0.2rem'
}))

const TourComponent = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { state: textSize } = useContext(TextSizeContext)
    const { width } = useScreenSize()

    const data = [
        {
            image: Image1,
            label: 'Skills You Love',
            text: "Let's discover awesome<br/>skills and start your future<br/>development today!"
        },
        {
            image: Image2,
            label: 'Bitely Better',
            text: "Let's unlock your potential<br/>together as I guide you through<br/>the skills - bit by bit!"
        },
        {
            image: Image3,
            label: 'Always there for you',
            text: "Let me be your nerdy friend!<br/>I'm always up for a conversation<br/>about your passions and interests!"
        },
    ]

    const handleNext = () => {
        if (currentIndex === 2) {
            navigate('/')
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <Wrapper>
            <LogoBox sx={{justifyContent:width<=MobileWidth? 'center': 'flex-start'}}>
                <ImageComponent src={SkillynxLogo} alt='logo' width='auto' height={width<=MobileWidth? '5rem':'7rem'} />
            </LogoBox>
            <ContentBox>
                <ImageComponent src={data[currentIndex].image} alt='image' height='22rem' width='auto' />
                <DotBox>
                    {
                        data.map((item, key) => (
                            <Dot isselected={key === currentIndex ? 'true' : undefined} />
                        ))
                    }
                </DotBox>
                <Label fontSize={TextSizes[textSize].title1}>{t(data[currentIndex].label)}</Label>
                <Text fontSize={TextSizes[textSize].title2}>{t(data[currentIndex].text).split("<br/>").join("\n")}</Text>
                <NextButton onClick={handleNext} variant='contained' sx={{fontSize:TextSizes[textSize].body}}>{t('Next')}</NextButton>
                {/* <Button onClick={() => { setCurrentIndex(0) }} sx={{ position: 'absolute', bottom: '0', right: '0' }}>Reset</Button> */}
            </ContentBox>
        </Wrapper>
    )
}

export default TourComponent