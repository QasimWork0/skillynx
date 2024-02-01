import React, { useContext } from "react";
import { Box, Button, styled } from "@mui/material";
import { Routes as MainMenu } from "entities/routes";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutesInterface } from "entities/interfaces";
import { TextSizeContext } from "data/index";
import { AppWidthMin, TextSizes } from "entities/constants";

const Drawer = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  width: "100%",
  height: '5rem',
  border: "none",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: 'center',
  zIndex: "999",
  position:'fixed',
  bottom:'0',
  boxShadow: `0px 0px 4px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.1)':'rgba(255, 255, 255, 0.1)'}`,
  minWidth: AppWidthMin
}));

const StyledButton = styled(Button)<{ ishome?: string }>(
  ({ theme, ishome }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: "50%",
    width: ishome?'4.4rem':"4rem",
    height: ishome?'4.4rem':"4rem",
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
    paddingTop: '0.6rem',
    marginTop: ishome && '-3rem',
    boxShadow: ishome && `0px 2px 4px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
    ':hover':{
      backgroundColor: theme.palette.secondary.main,
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

  return (
    <StyledButton
      onClick={() => navigate(menu.link)}
      ishome={isHome ? "true" : undefined}
      sx={{fontSize:TextSizes[textSize].caption2}}
    >
      {menu.title.toLocaleLowerCase().replaceAll(" ", "") === active
        ? menu.iconActiveMobile
        : menu.iconMobile}
      <>{menu.title}</>
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
