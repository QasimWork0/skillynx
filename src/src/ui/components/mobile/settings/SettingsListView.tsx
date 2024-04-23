import { Box, Divider, List, ListItem, ListItemButton, Typography, styled, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import SettingsCard from 'ui/components/pages/settings/cards/SettingsCard'
import SubScreenMobile from '../../shared/SubScreenMobile'

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}))

const ListElement = styled(ListItem)(({ theme }) => ({
  height: '6.6rem',
  padding: 0,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
}))

const ListButton = styled(ListItemButton)(() => ({
  height: '100%',
}))

const Title = styled(Typography)(({ theme }) => ({
  padding: '2rem 1.5rem',
  fontWeight: 700,
}))

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
  padding: 0,
  flexGrow: 1,
}))

const SettingsListView = ({ active, setActive, options }: any) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { state: textSize } = useContext(TextSizeContext)

  return (
    <WrapperBox>
      <Title fontSize={TextSizes[textSize].title1}>{t('Settings')}</Title>
      <StyledList>
        {
          options.map((option: any) => (
            <>
              <ListElement key={option.label}>
                <ListButton onClick={() => setActive(option)} >
                  <SettingsCard label={option.title} image={option.thumbnail} imageDark={option.thumbnailDark} />
                </ListButton>
              </ListElement>
              <Divider sx={{ backgroundColor: theme.palette.grey[900] }} />
            </>
          ))
        }
      </StyledList>
      {active && active.title &&
        <SubScreenMobile data={active} onClose={() => setActive({
          title: '',
          thumbnail: '',
          thumbnailDark: '',
          component: <></>
        })} >
          {active.component}
        </SubScreenMobile>
      }
    </WrapperBox>
  )
}

export default SettingsListView