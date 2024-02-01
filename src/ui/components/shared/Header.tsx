import React from 'react'
import { Box, IconButton, styled } from '@mui/material'
import SkillynxLogo from 'assets/logos/skillynx_text_logo.png'
import ImageComponent from './ImageComponent'
import useScreenSize from 'hooks/ScreenSize'
import MenuIcon from 'assets/icons/menu-Bold_1_black.png'
import { MobileWidth } from 'entities/constants'

const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '0.6rem 1.4rem',
  width:'100%',
  display: 'flex',
  boxShadow: `8px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
  zIndex: '999',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const UserIcon = styled('button')<{size?:string}>(({ theme, size='5rem' }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '50%',
  width: size,
  height: size,
  color: theme.palette.common.white,
  fontSize: '2.4rem',
  border: 'none'
}))

const SideNavButton = styled(IconButton)(({ theme }) => ({
  width: '3.6rem',
  height: '3.6rem'
}))

const Header = () => {
  const { width } = useScreenSize()
  return (
    <HeaderBox height={width > MobileWidth? '7.2rem':'6rem'}>
      {width > MobileWidth ? (
        <>
          <ImageComponent src={SkillynxLogo} alt='Logo' height='auto' width='250px' />
          <UserIcon>M</UserIcon>
        </>
      ) : (
        <>
          <SideNavButton>
            <ImageComponent src={MenuIcon} alt='menu' filterAllowed/>
          </SideNavButton>
          <ImageComponent src={SkillynxLogo} alt='Logo' height='auto' width='180px' />
          <UserIcon size='3.6rem'>M</UserIcon>
        </>
      )}
    </HeaderBox>
  )
}

export default Header