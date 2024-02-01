import React, { useContext } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, styled, useTheme } from "@mui/material";
import { Routes as MainMenu } from "entities/routes";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from 'assets/icons/log-out-Bold_1_.png'
import ImageComponent from "../shared/ImageComponent";
import RightArrowIcon from 'assets/icons/arrow-right-Bold_1_.png'
import { SkillsDrawerContext } from "data/index";

const ListElement = styled(ListItem)<{ active?: string }>(({ theme, active }) => ({
  height: '4.6rem',
  borderRadius: '0 1rem 1rem 0',
  padding: 0,
  background: active ? theme.palette.primary.light : 'none',
}))

const ListButton = styled(ListItemButton)(() => ({
  height: '100%',
  paddingLeft: '1.5rem',
  '&:hover': {
    borderRadius: '0 1rem 1rem 0'
  }
}))

const ShowButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  color: theme.palette.common.white,
  fontSize: '2.8rem',
  '&:hover': {
    backgroundColor: theme.palette.grey[600],
  },
  margin: '1rem',
  marginTop: '0',
  alignSelf: 'flex-start',
}))


const Sidebar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = pathname.split('/')[1]

  const { state: showSkillsDrawer, updateContext: setShowSkillsDrawer } = useContext(SkillsDrawerContext)

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        style: {
          width: '4.4rem',
          overflow: 'hidden',
          background: theme.palette.secondary.main,
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: '0.4rem',
          paddingBottom: '14rem',
          zIndex: '999'
        }
      }}
    >

      <Box sx={{width:'100%', height:'4rem'}}>
        {active === 'skills' && !showSkillsDrawer &&
          <ShowButton onClick={() => setShowSkillsDrawer(true)}>
            <ImageComponent src={RightArrowIcon} alt='show' filterAllowed/>
          </ShowButton>
        }
      </Box>

      <List >
        {
          MainMenu.map(menu => (
            <ListElement key={menu.title} active={menu.title.toLocaleLowerCase().replaceAll(' ', '') === active ? 'true' : undefined}>
              <ListButton onClick={() => navigate(menu.link)}>
                <ListItemIcon>
                  {menu.title.toLocaleLowerCase().replaceAll(' ', '') === active ? menu.iconActive : menu.icon}
                </ListItemIcon>
              </ListButton>
            </ListElement>
          ))
        }
        <ListElement sx={{ position: 'fixed', bottom: '1rem', width: '3.8rem' }}>
          <ListButton onClick={() => navigate('/login')}>
            <ListItemIcon>
              <ImageComponent src={LogoutIcon} alt="logout" />
            </ListItemIcon>
          </ListButton>
        </ListElement>
      </List>
    </Drawer>
  )

}

export default Sidebar
