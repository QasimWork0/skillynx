import React, { useContext } from "react";
import { Drawer, List, ListItem, ListItemButton, Typography, styled, useTheme } from "@mui/material";
import { Routes as MainMenu } from "entities/routes";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from 'assets/icons/Logout.png'
import LogoutIconDark from 'assets/icons/Logout-dark.png'
import ImageComponent from "../shared/ImageComponent";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";

const ListElement = styled(ListItem)<{ active?: string }>(({ theme, active }) => ({
  padding: 0,
  background: active ? theme.palette.grey[700] : 'none',
  borderRadius: '0px 5.5rem 5.5rem 0px',
}))

const ListButton = styled(ListItemButton)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'bottom',
  alignItems: 'center',
  height: '5rem',
  width: '5rem',
  padding: '1rem 1.75rem 1rem 1.25rem',
  borderRadius: '0px 5.5rem 5.5rem 0px'
}))

const ListButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.common.black,
}))

const Sidebar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = pathname.split('/')[1]
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation()

  const handleLogout = () => {
    localStorage.removeItem('currentUserToken')
    localStorage.removeItem('currentUserName')
    navigate('/auth')
  }

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        style: {
          overflow: 'hidden',
          background: theme.palette.grey[900],
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: '5.2rem',
          zIndex: '999'
        }
      }}
    >
      <List >
        {
          MainMenu.map(menu => (
            <ListElement key={menu.title} active={menu.title.toLocaleLowerCase().replaceAll(' ', '') === active ? 'true' : undefined}>
              <ListButton onClick={() => navigate(menu.link)}>
                {theme.palette.mode==='light'? menu.icon:menu.iconDark}
                <ListButtonText fontSize={TextSizes[textSize].footnote}>{t(menu.title)}</ListButtonText>
              </ListButton>
            </ListElement>
          ))
        }
        <ListElement sx={{ position: 'fixed', bottom: '1rem', width: '5rem'}}>
          <ListButton onClick={handleLogout}>
            <ImageComponent src={theme.palette.mode==='light'?LogoutIcon:LogoutIconDark} alt="logout" />
            <ListButtonText fontSize={TextSizes[textSize].footnote}>{t('Logout')}</ListButtonText>
          </ListButton>
        </ListElement>
      </List>
    </Drawer>
  )

}

export default Sidebar
