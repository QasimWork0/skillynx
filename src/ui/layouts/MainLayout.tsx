import { Alert, Box, styled } from "@mui/material";
import React, { useContext } from "react";
import Sidebar from "ui/components/sidebar/Sidebar";
import useScreenSize from "hooks/ScreenSize";
import AllRoutes from "routes/AllRoutes";
import BackgroundImage2 from "assets/images/Background_Chat.png";
import BackgroundImage1 from "assets/images/Background.png";
import { BackgroundContext } from "data/index";
import MobileNavbar from "ui/components/sidebar/MobileNavbar";
import { AppWidthMin, MobileWidth } from "entities/constants";
import Header from "ui/components/shared/Header";
import useAlert from "hooks/AlertHook";

const Wrapper = styled("main")<{ backgroundimagenumber: string }>(({ theme, backgroundimagenumber }) => ({
  backgroundImage: backgroundimagenumber === '1' ? `url(${BackgroundImage1})` : backgroundimagenumber === '2' ? `url(${BackgroundImage2})` : 'none',
  backgroundColor: backgroundimagenumber === '3' ? theme.palette.secondary.main : theme.palette.common.white,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  minWidth: AppWidthMin
}));

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  width: '100%',
  height: '100%',
  overflowY: "auto",
}));

const AlertBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: '99999999',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginTop: '5.5rem'
}));

const StyledAlert = styled(Alert)<{alertcolor?:string}>(({ theme, alertcolor }) => ({
  width: '30rem',
  border: `1px solid ${alertcolor==='success'? theme.palette.success.main: theme.palette.error.main}`,
  borderRadius: '0.5rem',
  fontFamily:'Helvetica'
}));

export default function MainLayout() {
  const { width } = useScreenSize();
  const { state: backgroundImage } = useContext(BackgroundContext)
  const { alert } = useAlert()

  return (
    <Wrapper sx={{ flexDirection: width <= MobileWidth ? 'column' : 'row' }} backgroundimagenumber={backgroundImage.toString()}>
      {width > MobileWidth && <Sidebar />}
      {width <= MobileWidth && <Header />}
      <MainBox sx={width > MobileWidth ? { marginLeft: "5rem", width: 'calc(100% - 5rem)' } : { height: 'calc(100% - 12rem)' }}>
        <AllRoutes />
      </MainBox>
      {width <= MobileWidth && <MobileNavbar />}
      {alert && <AlertBox sx={width > MobileWidth ? { marginLeft: "5rem", width: 'calc(100% - 5rem)' } : {}}>
        <StyledAlert severity={alert.color} alertcolor={alert.color}>{alert.message}</StyledAlert>
      </AlertBox>}
    </Wrapper>
  );
}
