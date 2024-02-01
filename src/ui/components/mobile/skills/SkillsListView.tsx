import { Box, Button, buttonClasses, List, ListItem, ListItemButton, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import SkillCardMobile from './cards/SkillCardMobile'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import { Add } from '@mui/icons-material'
import SkillChat from './SkillChat'


const SkillsBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
}))

const ListElement = styled(ListItem)<{ active?: string }>(({ theme, active }) => ({
    height: '7rem',
    padding: 0,
    background: active ? theme.palette.secondary.main : 'none',
}))

const ListButton = styled(ListItemButton)(() => ({
    height: '100%',
}))

const AddButton = styled(Button)(({ theme }) => ({
    borderRadius: '2rem',
    padding: '0 1.2rem',
    height: '2.2rem',
    fontWeight: 'bolder',
    color: theme.palette.common.black,
    textTransform: 'none',
    display: 'flex',
    lineHeight: '0.1rem',
    gap: '0.1rem',
    [`&.${buttonClasses.outlinedPrimary}`]: {
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.black}`,
    },
}))

const TitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '1.2rem',
    justifyContent: 'space-between',
}))

const SkillsListView = ({ active, setActive, options }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <SkillsBox>
            <TitleBox>
                <Typography color='primary' fontSize={TextSizes[textSize].title1} fontWeight={'Bold'}>{t('Skills')}</Typography>
                <AddButton onClick={() => {}} variant='outlined'
                    sx={{ fontSize: TextSizes[textSize].footnote }}>
                    <Add sx={{ width: TextSizes[textSize].subhead }} />
                    {t('Add New')}
                </AddButton>
            </TitleBox>
            <List>
                {
                    options.map((option: any) => (
                        <ListElement key={option.label} active={option.label === active.label ? 'true' : undefined}>
                            <ListButton onClick={() => setActive(option)} >
                                <SkillCardMobile label={option.label} image={option.image} progress={25} />
                            </ListButton>
                        </ListElement>
                    ))
                }
            </List>
            {active && active.label && <SkillChat data={active} onClose={()=>setActive({label:'',image:''})}/>}
        </SkillsBox>
    )
}

export default SkillsListView