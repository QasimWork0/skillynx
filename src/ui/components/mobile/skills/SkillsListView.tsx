import { Box, Button, buttonClasses, List, ListItem, ListItemButton, Typography, styled, IconButton, useTheme, Divider } from '@mui/material'
import React, { useContext, useState } from 'react'
import SkillCardMobile from './cards/SkillCardMobile'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import { Add } from '@mui/icons-material'
import SubScreenMobile from '../../shared/SubScreenMobile'
import ImageComponent from 'ui/components/shared/ImageComponent'
import MoreIcon from 'assets/icons/More-Vertical.png'
import MoreIconDark from 'assets/icons/More-Vertical-dark.png'
import DeleteIcon from 'assets/icons/trash_white.png'
import SkillsChatWrapper from 'ui/containers/skills/SkillsChatWrapper'

const SkillsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
}))

const ListElement = styled(ListItem)<{ more?: string }>(({ theme, more }) => ({
    backgroundColor: more ? theme.palette.grey[800] : theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
    height: '7.25rem',
    padding: '0 0.75rem 0 0',
    borderRadius: '0rem 0rem 1.5rem 0rem',
    borderRight: more ? `6px solid ${theme.palette.primary.main}` : 'none',
    gap: '0.5rem',
    zIndex: 2,
}))

const ListButton = styled(ListItemButton)(() => ({
    height: '100%',
    padding: '0.25rem 0.25rem 0.25rem 1.5rem',
    borderRadius: '0 4px 4px 0'
}))

const AddButton = styled(Button)(({ theme }) => ({
    width: '7.25rem',
    height: '3rem',
    borderRadius: '2rem',
    fontWeight: 700,
    color: theme.palette.common.black,
    textTransform: 'none',
    display: 'flex',
    lineHeight: '0.1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`&.${buttonClasses.outlinedPrimary}`]: {
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.black}`,
    },
}))

const TitleBox = styled(Box)(({ theme }) => ({
    height: '6.4375rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.25rem 1.5rem',
    flexShrink: 0,
}))

const ListElementBox = styled(Box)(({ theme }) => ({
    display: 'flex'
}))

const DeleteBox = styled(Button)(({ theme }) => ({
    // backgroundColor: theme.palette.warning.main,
    width: '5.6rem',
    height: '7.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    padding: '0rem 1.375rem 0rem 2.6875rem',
    zIndex: 1,
}))

const StyledList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
    padding: 0,
    flexGrow: 1,
}))

const SkillsListView = ({ active, setActive, options, deleteUserCourse, updateProgress }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)
    const [moreOptionLabel, setMoreOptionLabel] = useState('')

    const handleMore = (label: string) => {
        setMoreOptionLabel(moreOptionLabel !== label ? label : '')
    }

    return (
        <SkillsBox>
            <TitleBox>
                <Typography fontSize={TextSizes[textSize].title1} fontWeight={700}>{t('Skills')}</Typography>
                <AddButton onClick={() => { }} variant='outlined'
                    sx={{ fontSize: TextSizes[textSize].footnote, fontWeight: 500 }}>
                    <Add sx={{ width: TextSizes[textSize].title2 }} />
                    {t('Add New')}
                </AddButton>
            </TitleBox>
            <StyledList>
                {
                    options.map((option: any) => (
                        <>
                            <ListElementBox key={option.id}>
                                <ListElement more={option.title === moreOptionLabel ? 'true' : undefined} sx={{ marginRight: '-1.312rem' }}>
                                    <ListButton onClick={() => setActive(option)} >
                                        <SkillCardMobile label={option.title} image={option.thumbnail} progress={option.progress} selected={option.title === moreOptionLabel} />
                                    </ListButton>
                                    <IconButton onClick={() => handleMore(option.title)}>
                                        <ImageComponent src={theme.palette.mode === 'light' ? MoreIcon : MoreIconDark} alt='more' width='1.5rem' height='1.5rem' />
                                    </IconButton>
                                </ListElement>
                                {option.title === moreOptionLabel &&
                                    <DeleteBox color='warning' variant='contained' onClick={() => deleteUserCourse(option.id)}>
                                        <ImageComponent src={DeleteIcon} alt='delete' width='2rem' height='2rem' />
                                    </DeleteBox>
                                }
                            </ListElementBox>
                            <Divider sx={{ backgroundColor: theme.palette.grey[900] }} />
                        </>
                    ))
                }
            </StyledList>
            {active && active.title &&
                <SubScreenMobile data={active} onClose={() => setActive({ title: "", thumbnail: "" })} >
                    <Box sx={{
                        width: 'calc(100% + 1.75rem)',
                        height: '100%',
                        margin: '0 -1rem',
                        overflowX:'clip'
                    }}>
                        <SkillsChatWrapper active={active} updateProgress={updateProgress} />
                    </Box>
                </SubScreenMobile>
            }
        </SkillsBox>
    )
}

export default SkillsListView