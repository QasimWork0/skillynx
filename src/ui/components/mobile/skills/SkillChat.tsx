import React, { useContext } from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import BackgroundImage from "assets/images/Background_Chat.png";
import ChatComponentMobile from '../home/ChatComponentMobile';
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
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bottom: '5rem',
    zIndex: '999',
}))

const HeaderBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: '0.6rem 1.4rem 0.6rem 0.4rem',
    height: '6rem',
    width: '100%',
    display: 'flex',
    boxShadow: `8px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
    justifyContent: 'space-between',
    alignItems: 'center'
}))

const HeaderText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.common.black
}))

const SkillChat = ({ data, onClose }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <WrapperBox>
            <HeaderBox>
                <IconButton onClick={onClose} sx={{padding:'1rem', marginRight:'1.2rem'}}>
                    <ImageComponent src={Lefticon} alt='back' width='auto' height='1.4rem' />
                </IconButton>
                <HeaderText fontSize={TextSizes[textSize].title1}>{t(data.label)}</HeaderText>
                <ImageComponent src={data.image} alt='image' width='3.6rem' height='3.6rem' />
            </HeaderBox>
            <Box sx={{ height: 'calc(100% - 6rem)' }}>
                <ChatComponentMobile />
            </Box>
        </WrapperBox>
    )
}

export default SkillChat