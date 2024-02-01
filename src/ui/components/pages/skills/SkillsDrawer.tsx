import { Box, IconButton, List, ListItem, ListItemButton, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SkillynxLogo from 'assets/logos/skillynx_text_logo.png'
import LeftArrowIcon from 'assets/icons/arrow-left-Bold_1_.png'
import SkillCard from './cards/SkillCard'
import { SkillsDrawerContext, TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'


const SkillsBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxShadow: `2px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.07)':'rgba(255, 255, 255, 0.07)'}`,
}))

const ListElement = styled(ListItem)<{ active?: string }>(({ theme, active }) => ({
    height: '7rem',
    padding: 0,
    background: active ? theme.palette.secondary.main : 'none',
}))

const ListButton = styled(ListItemButton)(() => ({
    height: '100%',
}))

const HideButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    color: theme.palette.common.white,
    fontSize: '2.8rem',
    '&:hover': {
        backgroundColor: theme.palette.grey[600],
    }
}))

const HideBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '1.2rem',
    justifyContent: 'space-between',
}))

const SkillsDrawer = ({active, setActive, options}:any) => {
    const { t } = useTranslation()
    const {updateContext: setShowSkillsDrawer } = useContext(SkillsDrawerContext)
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <SkillsBox>
            <Box sx={{ margin: '0.6rem 0 0 1.4rem' }}>
                <ImageComponent src={SkillynxLogo} alt='Logo' height='auto' width='250px' />
            </Box>
            <HideBox>
                <Typography color='primary' fontSize={TextSizes[textSize].title1} fontWeight={'Bold'}>{t('Skills')}</Typography>
                <HideButton onClick={() => setShowSkillsDrawer(false)}>
                    <ImageComponent src={LeftArrowIcon} alt='hide' filterAllowed/>
                </HideButton>
            </HideBox>
            <List>
                {
                    options.map((option:any) => (
                        <ListElement key={option.label} active={option.label === active.label ? 'true' : undefined}>
                            <ListButton onClick={() => setActive(option)} >
                                <SkillCard label={option.label} image={option.image} progress={25} />
                            </ListButton>
                        </ListElement>
                    ))
                }
            </List>
        </SkillsBox>
    )
}

export default SkillsDrawer