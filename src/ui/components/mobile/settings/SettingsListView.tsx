import { Box, List, ListItem, ListItemButton, Typography, styled } from '@mui/material'
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
  background: theme.palette.common.white,
  marginBottom:'0.4rem',
}))

const ListButton = styled(ListItemButton)(() => ({
  height: '100%',
}))

const Title = styled(Typography)(({ theme }) => ({
  padding: '1.2rem',
  fontWeight: 'Bold',
  color: theme.palette.common.black,
}))

const SettingsListView = ({ active, setActive, options }: any) => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)

  return (
    <WrapperBox>
      <Title fontSize={TextSizes[textSize].title1}>{t('Settings')}</Title>
      <List>
        {
          options.map((option: any) => (
            <ListElement key={option.label}>
              <ListButton onClick={() => setActive(option)} >
                <SettingsCard label={option.label} image={option.image} progress={25} />
              </ListButton>
            </ListElement>
          ))
        }
      </List>
      {active && active.label && <SubScreenMobile data={active} onClose={()=>setActive({label:'',image:''})}/>}
    </WrapperBox>
  )
}

export default SettingsListView