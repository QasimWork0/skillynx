import { Box, List, ListItem, ListItemButton, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import DrawerCard from './DrawerCard'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'


const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    // minHeight: '51rem',
    height: '100%',
    width: '17.62rem',
    gap: '2.5rem',
    flexShrink: 0,
    // boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.2)`,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        width: "0.2rem",
        height: '0.2rem',
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
    // paddingRight: '0.1rem',
}))

const ListElement = styled(ListItem)<{ active?: string }>(({ theme, active }) => ({
    padding: 0,
    backgroundColor: active ? theme.palette.grey[800] : 'none',
    borderRight: `3px solid ${active ? theme.palette.primary.main : 'transparent'}`,
}))


const ListButton = styled(ListItemButton)(() => ({
    height: '6.25rem',
    padding: '4px 0px 4px 20px',
    justifyContent: 'space-between',
}))

const ListBox = styled(Box)(() => ({
    display: 'flex',
    flexGrow:1,
    height: '6.25rem',
    padding: '4px 0px 4px 20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
}))

const TitleBox = styled(Box)(() => ({
    height: '5rem',
    width: '100%',
    padding: '4px 20px',
    display: 'flex',
    alignItems: 'center'
}))

const Drawer = ({ active, setActive, options, title, menu = [], isSettings = false }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    return (
        <Wrapper>
            <TitleBox>
                <Typography fontSize={TextSizes[textSize].title2} fontWeight={'Bold'}>{t(title)}</Typography>
            </TitleBox>
            <List>
                {
                    options.map((option: any) => (
                        <ListElement key={option.title} active={option.title === active.title ? 'true' : undefined}>
                            {option.title === active.title ?
                                <ListBox onClick={() => setActive(option)} >
                                    <DrawerCard courseId={option.id} label={option.title} image={option.thumbnail} imageDark={option.thumbnailDark} progress={25} active={option.title === active.title} menu={menu} isSettings={isSettings} />
                                </ListBox>
                                :
                                <ListButton onClick={() => setActive(option)} >
                                    <DrawerCard courseId={option.id} label={option.title} image={option.thumbnail} imageDark={option.thumbnailDark} progress={25} active={option.title === active.title} menu={menu} isSettings={isSettings} />
                                </ListButton>
                            }
                        </ListElement>
                    ))
                }
            </List>
        </Wrapper>
    )
}

export default Drawer