import React, { useContext } from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import BackgroundImage from "assets/images/Background_Chat.png";
import { TextSizes } from 'entities/constants';
import { useTranslation } from 'react-i18next';
import { TextSizeContext } from 'data/index';
import ImageComponent from 'ui/components/shared/ImageComponent';
import Lefticon from 'assets/icons/chevron-left-Bold_1_.png'

const WrapperBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: theme.palette.common.white,
    backgroundSize: "cover",
    position: 'fixed',
    top: '6rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bottom: '5rem',
}))

const HeaderBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '0.6rem 1rem',
    height: '3.4rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
}))

const HeaderText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.common.black
}))

const ContentBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '100%',
}))


const SubScreenMobile = ({ data, onClose, padding = '1rem' }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <WrapperBox>
            <HeaderBox>
                <IconButton onClick={onClose} sx={{ padding: '0.8rem', marginRight: '1.4rem' }}>
                    <ImageComponent src={Lefticon} alt='back' width='auto' height='1.4rem' />
                </IconButton>
                {data && data.image &&
                    <ImageComponent src={data.image} alt='image' width='2rem' height='2rem' filterAllowed />
                }
                <HeaderText fontSize={TextSizes[textSize].title2} sx={data && data.image?{}:{
                    marginRight: '3.2rem',
                    width:'100%',
                    textAlign: 'center'
                }}>{t(data.label)}</HeaderText>
            </HeaderBox>
            <ContentBox sx={data.label === 'Feedback' ? { padding: '0' } : { padding: padding }}>
                {data.component}
            </ContentBox>
        </WrapperBox>
    )
}

export default SubScreenMobile