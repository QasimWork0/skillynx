import React, { FormEvent, useState, ChangeEvent, useContext } from 'react'
import { Box, Button, TextField, Typography, styled } from '@mui/material'
import BackgroundImage from 'assets/images/Background_Login.png'
import { useNavigate } from 'react-router-dom'
import { Facebook, Google } from '@mui/icons-material'
import TourComponent from 'ui/components/pages/login/TourComponent'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { MobileWidth, TextSizes } from 'entities/constants'
import useScreenSize from 'hooks/ScreenSize'

const MainBox = styled(Box)(() => ({
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: '100vw 100vh',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
}))

const LoginForm = styled('form')<{ ismobile?: string }>(({ theme, ismobile }) => ({
    backgroundColor: ismobile ? 'transparent' : theme.palette.common.white,
    width: '32rem',
    borderRadius: '2rem',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    gap: '1rem',
}))

const LoginInput = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    width: '20rem',
    padding: '0.7rem 2rem',
    borderRadius: '4rem',
    boxShadow: `0px 2px 4px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
}))

const LoginButton = styled(Button)(({ theme }) => ({
    width: '20rem',
    padding: '0.7rem 1rem',
    borderRadius: '4rem',
    display: 'flex',
    color: theme.palette.common.white
}))

const LoginButtonText = styled(Typography)(({ theme }) => ({
    width: '100%',
    color: theme.palette.common.white
}))

const ErrorTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
}))

export default function Login() {
    const { state: textSize } = useContext(TextSizeContext)
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [error, setError] = useState({ username: false, password: false, message: '' })
    const { width } = useScreenSize()

    let isNewUser = true
    const [showWelcome, setShowWelcome] = useState(false)

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formData.username && formData.password) {
            if (isNewUser) {
                setShowWelcome(true)
            } else {
                navigate('/')
            }
        }
        else {
            if (!formData.username && !formData.password) {
                setError({
                    username: true,
                    password: true,
                    message: 'Username and email required'
                })
            }
            else if (!formData.username) {
                setError({
                    username: true,
                    password: false,
                    message: 'Username required'
                })
            } else {
                setError({
                    username: false,
                    password: true,
                    message: 'Password required'
                })
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setFormData({
            ...formData,
            [key]: event.target.value
        })
        setError({ ...error, [key]: false, message: '' })
    };

    return (
        <>
            {showWelcome ?
                <TourComponent />
                :
                <MainBox>
                    <LoginForm onSubmit={handleLogin} ismobile={width <= MobileWidth ? 'true' : undefined}>
                        <Typography component="h1" fontSize={TextSizes[textSize].largeTitle} color='textPrimary'>{t('Login')}</Typography>
                        <Typography component="h2" fontSize={TextSizes[textSize].title3} color='textSecondary' textAlign={'center'}>{t('Add your details to login')}</Typography>
                        <LoginInput placeholder={t('Your Email')} value={formData.username} onChange={e => handleChange(e, 'username')} error={error.username} variant="standard" InputProps={{ sx: { fontSize: TextSizes[textSize].body }, disableUnderline: true }} />
                        <LoginInput placeholder={t('Password')} type='password' value={formData.password} onChange={e => handleChange(e, 'password')} error={error.password} variant="standard" InputProps={{ sx: { fontSize: TextSizes[textSize].body }, disableUnderline: true }} />
                        <Box sx={{ height: '1rem' }}>
                            {error &&
                                <ErrorTypography>{t(error.message)}</ErrorTypography>
                            }
                        </Box>
                        <LoginButton variant='contained' color='primary' type='submit' sx={{ fontSize: TextSizes[textSize].body }}>{t('Login')}</LoginButton>
                        <Typography sx={{ marginBottom: '2rem', textDecoration: 'underline', cursor: 'pointer', fontSize: TextSizes[textSize].body }}>{t('Forgot your password')}?</Typography>

                        <Typography component="h3" sx={{ fontWeight: 'bold', fontSize: TextSizes[textSize].title2 }}>{t("or Login with")}</Typography>
                        <LoginButton variant='contained' color='info'>
                            <Facebook fontSize='medium' />
                            <LoginButtonText fontSize={TextSizes[textSize].body}>{t('Login with Facebook')}</LoginButtonText>
                        </LoginButton>
                        <LoginButton variant='contained' color='warning'>
                            <Google fontSize='medium' />
                            <LoginButtonText fontSize={TextSizes[textSize].body}>{t('Login with Google')}</LoginButtonText>
                        </LoginButton>
                        <Typography component="p" fontSize={TextSizes[textSize].body}
                            sx={{
                                textAlign: 'center',
                                marginTop: '1rem',
                                color: width <= MobileWidth ? 'white' : 'black'
                            }}>
                            {t("Don't have an account")}?
                            <b>{t('Sign Up')}</b>
                        </Typography>
                    </LoginForm>
                </MainBox>
            }
        </>
    )
}
