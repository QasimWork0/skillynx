import React, { useContext } from 'react'
import { Box, IconButton, Typography, styled, useTheme } from '@mui/material'
import { TextSizes } from 'entities/constants';
import { useTranslation } from 'react-i18next';
import { BackgroundContext, TextSizeContext } from 'data/index';
import ImageComponent from 'ui/components/shared/ImageComponent';
import LeftIcon from 'assets/icons/chevron-left.png'
import LeftIconDark from 'assets/icons/chevron-left-dark.png'
import BackgroundImage2 from "assets/images/Background_Chat.png";
import BackgroundImage1 from "assets/images/Background.png";

const WrapperBox = styled(Box)<{ backgroundimagenumber: string }>(({ theme, backgroundimagenumber }) => ({
    backgroundImage: backgroundimagenumber === '1' ? `url(${BackgroundImage1})` : backgroundimagenumber === '2' ? `url(${BackgroundImage2})` : 'none',
    backgroundColor: backgroundimagenumber === '3' ? theme.palette.secondary.main : theme.palette.common.white,
    backgroundSize: "cover",
    position: 'fixed',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    bottom: '7rem',
    zIndex: '999',
    overflowY: 'auto',
}))

const HeaderBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: '0rem 1.5rem',
    height: '5rem',
    width: '100%',
    display: 'flex',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    zIndex: '9'
}))

const HeaderText = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
}))

const SubScreenMobile = ({ data, onClose, children }: any) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    const { state: backgroundImage } = useContext(BackgroundContext)

    return (
        <WrapperBox backgroundimagenumber={backgroundImage.toString()}>
            <HeaderBox>
                <IconButton onClick={onClose} >
                    <ImageComponent src={theme.palette.mode==='light'?LeftIcon:LeftIconDark} alt='back' width='1.5rem' height='1.5rem' />
                </IconButton>
                <HeaderText fontSize={TextSizes[textSize].title3}>{t(data.title)}</HeaderText>
                <ImageComponent src={theme.palette.mode==='light'? data.thumbnail:data.thumbnailDark} alt='image' width='3.6rem' height='3.6rem' borderRadius='50%' />
            </HeaderBox>
            <Box sx={{overflowY:'auto', padding:'0 0.7rem'}}>
                {children}
            </Box>
        </WrapperBox>
    )
}

export default SubScreenMobile