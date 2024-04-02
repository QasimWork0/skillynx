import React, { useContext } from 'react'
import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material'
import SkillynxLogo from 'assets/logos/skillynx.png'
import ImageComponent from './ImageComponent'
import useScreenSize from 'hooks/ScreenSize'
import MenuIcon from 'assets/icons/menu.png'
import MenuIconDark from 'assets/icons/Menu-Dark.png'
import { MobileWidth, TextSizes } from 'entities/constants'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { DrawerPropType } from 'entities/interfaces'
import { Unstable_Popup } from '@mui/base/Unstable_Popup';
import LogoutIcon from 'assets/icons/Logout.png'
import LogoutIconDark from 'assets/icons/Logout-dark.png'

const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '1rem 1.25rem 1rem 1rem',
  width: '100%',
  display: 'flex',
  boxShadow: theme.palette.mode==='light' ?'2px 4px 4px rgba(0, 0, 0, 0.1)':'',
  zIndex: '999',
  alignItems: 'center',
  gap: '1.25rem',
  height: '5rem'
}))

const UserIcon = styled('button')<{ size?: string }>(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  color: '#0F0F0F',
  fontWeight: 500,
  fontSize: '2rem',
  border: 'none'
}))

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  flexGrow: '1',
  gap: '1rem'
}))

const OptionsPopup = styled(Unstable_Popup)(({ theme }) => ({
  paddingLeft: '2rem',
  zIndex: '999999999',
}))

const OptionsBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  width: '108px',
  borderRadius: '4px',
  boxShadow: '0px 0px 16px 4px rgba(127, 127, 127, 0.3)',
  padding: '10px 0',
}))

const Option = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  height: '40px',
  display: 'flex',
  padding: '4px 12px 4px 20px',
  gap: '8px',
  textTransform: 'none',
  justifyContent: 'flex-start'
}))

const OptionsArrowBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  marginTop: '-15px',
  marginLeft: '30px',
  width: '12px',
  height: '12px',
  transform: 'rotate(45deg)',
  flexShrink: 0
}))

const Header = ({ data, isSetting = false }: { data?: DrawerPropType, isSetting?: boolean }) => {
  const { width } = useScreenSize()
  const { t } = useTranslation()
  const theme = useTheme()
  const { state: textSize } = useContext(TextSizeContext)

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleMore = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <HeaderBox justifyContent={width > MobileWidth ? 'flex-start' : 'space-between'} >
      {width > MobileWidth ? (
        <>
          <Box sx={{ width: '16.62rem', paddingTop: '0.4rem' }}>
            <ImageComponent src={SkillynxLogo} alt='Logo' height='43px' width='158.052px' />
          </Box>
          <TitleBox>
            {data && data.title &&
              <>
                <ImageComponent src={theme.palette.mode === 'dark' && data.thumbnailDark ? data.thumbnailDark : data.thumbnail} alt='skill' width={isSetting ? '3rem' : '3.75rem'} height={isSetting ? '3rem' : '3.75rem'} borderRadius={isSetting ? '' : '50%'} />
                <Typography sx={{ fontWeight: '700', fontSize: TextSizes[textSize].title2, color: theme.palette.common.black }}>{t(data.title)}</Typography>
              </>
            }
          </TitleBox>
          <UserIcon>{window.localStorage.getItem("currentUserName")?.charAt(0)}</UserIcon>
        </>
      ) : (
        <>
          <IconButton onClick={handleMore}>
            <ImageComponent src={theme.palette.mode==='light'? MenuIcon:MenuIconDark} alt='menu' width='1.5rem' height='1.5rem' />
          </IconButton>
          <ImageComponent src={SkillynxLogo} alt='Logo' height='2rem' width='7.1875rem' />
          <UserIcon size='3rem' sx={{ fontSize: '1.5rem' }}>{window.localStorage.getItem("currentUserName")?.charAt(0)}</UserIcon>
          <OptionsPopup id={id} open={open} anchor={anchor}>
            <OptionsBox>
              <Option sx={{ fontSize: TextSizes[textSize].subhead }}  onClick={() => {}} >
                <ImageComponent src={theme.palette.mode==='light'?LogoutIcon:LogoutIconDark} alt='icon' width='1.25rem' height='1.25rem' />
                {t('Logout')}
              </Option>
              <OptionsArrowBox />
            </OptionsBox>
          </OptionsPopup>
        </>
      )}
    </HeaderBox>
  )
}

export default Header