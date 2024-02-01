import React, { useContext } from 'react'
import { Box, Typography, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '0.6rem 1.4rem',
  height: '7.2rem',
  display: 'flex',
  boxShadow: `2px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
  zIndex: '999',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const UserIcon = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '50%',
  width: '5rem',
  height: '5rem',
  color: theme.palette.common.white,
  fontSize: '2.4rem',
  border: 'none'
}))

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  paddingLeft: '1.6rem',
  gap: '1rem'
}))

const DrawerHeader = ({ data, isSetting = false }: any) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { state: textSize } = useContext(TextSizeContext)
  return (
    <WrapperBox>
      <HeaderBox>
        {data && data.label &&
          <>
            <ImageComponent src={data.image} alt='skill' width={isSetting ? '3.6rem' : '6rem'} height={isSetting ? '3.6rem' : '6rem'} filterAllowed={isSetting} />
            <Typography sx={{ fontWeight: 'bold', fontSize: TextSizes[textSize].title1, color: theme.palette.common.black }}>{t(data.label)}</Typography>
          </>
        }
      </HeaderBox>
      <UserIcon>M</UserIcon>
    </WrapperBox>
  )
}

export default DrawerHeader