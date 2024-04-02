import React, { FormEvent, useState, ChangeEvent, useContext } from 'react'
import { Box, Button, TextField, Typography, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { MobileWidth, TextSizes } from 'entities/constants'
import useScreenSize from 'hooks/ScreenSize'
import FacebokIcon from 'assets/icons/Facebook.png'
import GoogleIcon from 'assets/icons/Google.png'
import ImageComponent from 'ui/components/shared/ImageComponent'
import WithLoginData from 'ui/containers/login'
import { LoginPropType } from 'entities/interfaces'

const LoginForm = styled('form')<{ ismobile?: string }>(({ theme, ismobile }) => ({
    width: '32rem',
    borderRadius: '2rem',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    gap: '2rem',
    paddingBottom: '6rem',
    maxHeight: '100%',
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
      height: '0.4rem',
    },
    "&::-webkit-scrollbar-track": {
      background: 'transparent',
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.dark,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.grey[700],
    },
}))

const VarticalBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))

const LoginInput = styled(TextField)(({ theme }) => ({
    '.MuiOutlinedInput-root': {
        padding: '0.25rem 1.25rem',
        width: '23.75rem',
        height: '3.5rem',
        borderRadius: '4rem',
        boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.2)`,
        '& fieldset': {
            borderColor: '#949494',
          },
          '&:hover fieldset': {
            borderColor: '#3A4754',
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
    },
}))

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#374755',
    width: '23.75rem',
    height: '3.5rem',
    borderRadius: '4rem',
    textTransform: 'none',
    display: 'flex',
    gap:'0.75rem'
}))

const LoginButtonText = styled(Typography)(({ theme }) => ({
    color: '#FFF'
}))

const ErrorTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
}))

const Login = ({loginUser}:LoginPropType) => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { state: textSize } = useContext(TextSizeContext)

    const [formData, setFormData] = useState({ username: '', password: '' })
    const [error, setError] = useState({ username: false, password: false, message: '' })
    const { width } = useScreenSize()

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formData.username && formData.password) {
            const response = await loginUser(formData.username, formData.password)
            if(response.status===200){
                window.localStorage.setItem("currentUserToken", response.content.token)
                window.localStorage.setItem("currentUserName", `${response.content.firstName} ${response.content.lastName}`)
                navigate('/')
            }else{
                setError({ username: true, password: true, message: response.message })
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
        <LoginForm onSubmit={handleLogin} ismobile={width <= MobileWidth ? 'true' : undefined}>
            <VarticalBox>
                <Typography component="h1" fontSize={TextSizes[textSize].extraLargeTitle} color='#4A4B4D'>{t('Login')}</Typography>
                <Typography component="h2" fontSize={TextSizes[textSize].subhead} color='#7C7D7E' textAlign={'center'}>{t('Add your details to login')}</Typography>
            </VarticalBox>
            <VarticalBox>
                <VarticalBox gap={'1.5rem'}>
                    <LoginInput placeholder={t('Your Email')} type='email' value={formData.username} onChange={e => handleChange(e, 'username')} error={error.username} InputProps={{ sx: { fontSize: TextSizes[textSize].subhead } }} />
                    <LoginInput placeholder={t('Password')} type='password' value={formData.password} onChange={e => handleChange(e, 'password')} error={error.password} InputProps={{ sx: { fontSize: TextSizes[textSize].subhead } }} />
                </VarticalBox>
                <Box sx={{ height: '1rem' }}>
                    {error &&
                        <ErrorTypography fontSize={TextSizes[textSize].subhead}>{t(error.message)}</ErrorTypography>
                    }
                </Box>
            </VarticalBox>
            <VarticalBox>
                <LoginButton variant='contained' color='primary' type='submit' sx={{ fontSize: TextSizes[textSize].body }}>{t('Login')}</LoginButton>
                <Typography color='#6D6D6D' sx={{ marginTop: '2rem', cursor: 'pointer', fontSize: TextSizes[textSize].callout }}>{t('Forgot your password')}?</Typography>
            </VarticalBox>
            <VarticalBox>
                <Typography color='#7C7D7E' component="h3" sx={{ margin: '1rem', fontWeight: 'bolder', fontSize: TextSizes[textSize].callout }}>{t("or Login with")}</Typography>
                <VarticalBox gap={'1.5rem'}>
                    <LoginButton variant='contained' color='info'>
                        <ImageComponent src={FacebokIcon} alt='icon' width='0.844125rem' height='1.52725rem' />
                        <LoginButtonText fontSize={TextSizes[textSize].body}>{t('Login with Facebook')}</LoginButtonText>
                    </LoginButton>
                    <LoginButton variant='contained' color='error'>
                        <ImageComponent src={GoogleIcon} alt='icon' width='1.99925rem' height='1.25rem' />
                        <LoginButtonText fontSize={TextSizes[textSize].body}>{t('Login with Google')}</LoginButtonText>
                    </LoginButton>
                </VarticalBox>
                <Typography component="p" fontSize={TextSizes[textSize].body}
                    sx={{
                        textAlign: 'center',
                        marginTop: '1rem',
                    }}>
                    {t("Don't have an account")}?&nbsp;
                    <b>{t('Sign Up')}</b>
                </Typography>
            </VarticalBox>
        </LoginForm>
    )
}

export default WithLoginData(Login)