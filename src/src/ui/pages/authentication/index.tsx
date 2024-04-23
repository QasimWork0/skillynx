import React, { useContext, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import BackgroundImage from 'assets/images/Background_Login.png'
import BackgroundImageMobile from 'assets/images/Background_Login_Mobile.png'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SkillynxLogo from 'assets/logos/Skillynx_Logo_01.png'
import { SubmitButton } from 'ui/components/shared/SubmitButton'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'
import Login from 'ui/components/pages/authentication/Login'

const Wrapper = styled(Box)(({theme}) => ({
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: '100vw 100vh',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
        backgroundImage: `url(${BackgroundImageMobile})`,
    }
}))

const AuthBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '3.75rem',
    paddingBottom: '13rem',
    maxHeight: '100%',
    overflow:'hidden'
}))

const ButtonBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '1.875rem'
}))

const Text = styled(Typography)(({ theme }) => ({
    width: '19.1875rem',
    textAlign: 'center',
    color: theme.palette.text.secondary
}))

const Authentication = () => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)
    const [option, setOption] = useState<'login' | 'register' | undefined>();

    return (
        <Wrapper>
            {option ?
                option === 'login' ?
                    <Login />
                    :
                    <></>
                :
                <AuthBox>
                    <ImageComponent src={SkillynxLogo} alt='logo' width='15.875rem' height='12rem' />
                    <ButtonBox>
                        <SubmitButton onClick={() => { setOption('login') }} width='24rem' height='3.5rem' marginTop={0}>{t('Login')}</SubmitButton>
                        <SubmitButton onClick={() => { }} width='24rem' height='3.5rem' marginTop={0} variant='outlined' fontColor='#374755'>{t('Create an account')}</SubmitButton>
                        <Text fontSize={TextSizes[textSize].callout}>{t('Please login to your existing account or create a new one!')}</Text>
                    </ButtonBox>
                </AuthBox>
            }
        </Wrapper>
    )
}

export default Authentication