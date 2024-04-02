import React, { useContext } from "react";
import { Box, Button, styled, useTheme } from "@mui/material";
import { Routes as MainMenu } from "entities/routes";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutesInterface } from "entities/interfaces";
import { TextSizeContext } from "data/index";
import { AppWidthMin,  TextSizes } from "entities/constants";
import { useTranslation } from "react-i18next";

const Drawer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode==='light'? theme.palette.grey[900]:theme.palette.secondary.main,
  width: "100%",
  height: '7rem',
  border: "none",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: 'center',
  zIndex: "999",
  position:'fixed',
  bottom:'0',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
  minWidth: AppWidthMin,
  gap: '0.5rem'
}));

const StyledButton = styled(Button)<{ ishome?: string }>(
  ({ theme, ishome }) => ({
    backgroundColor: ishome && theme.palette.mode==='dark'? theme.palette.grey[800] : theme.palette.mode==='dark'? theme.palette.secondary.main: theme.palette.grey[900],
    borderRadius: "50%",
    width: ishome?'4.4rem':"4rem",
    height: ishome?'4.4rem':"4rem",
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
    paddingTop: '0.6rem',
    marginTop: ishome && '-3rem',
    boxShadow: ishome ? '0px 2px 4px rgba(0, 0, 0, 0.2)':'',
    ':hover':{
      backgroundColor: theme.palette.secondary.dark,
    }
  })
);

const NavButton = ({
  menu,
  isHome = false,
}: {
  menu: RoutesInterface;
  isHome?: boolean;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname.split("/")[1];
  const { state: textSize } = useContext(TextSizeContext)
  const {t} = useTranslation()
  const theme = useTheme()

  const isActive = menu.title.toLocaleLowerCase().replaceAll(" ", "") === active

  return (
    <StyledButton
      onClick={() => navigate(menu.link)}
      ishome={isHome ? "true" : undefined}
      sx={{
        fontSize:TextSizes[textSize].caption2,
        color: isActive? theme.palette.primary.main: '#949494'
      }}
    
    >
      {isActive? menu.iconActiveMobile : menu.iconMobile}
      <>{t(menu.title)}</>
    </StyledButton>
  );
};

const MobileNavbar = () => {
  return (
    <Drawer>
      <NavButton menu={MainMenu[2]} />
      <NavButton menu={MainMenu[1]} />
      <NavButton menu={MainMenu[0]} isHome />
      <NavButton menu={MainMenu[3]} />
      <NavButton menu={MainMenu[4]} />
    </Drawer>
  );
};

export default MobileNavbar;
