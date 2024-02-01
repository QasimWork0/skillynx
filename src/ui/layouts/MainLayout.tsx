import { Box, styled } from "@mui/material";
import React from "react";
import Sidebar from "ui/components/sidebar/Sidebar";
import useScreenSize from "hooks/ScreenSize";
import AllRoutes from "routes/AllRoutes";
import BackgroundImage from "assets/images/Background_Chat.png";
import { SkillsDrawerContextProvider } from "data/index";
import MobileNavbar from "ui/components/sidebar/MobileNavbar";
import { AppWidthMin, MobileWidth } from "entities/constants";
import Header from "ui/components/shared/Header";

const Wrapper = styled("main")(({ theme }) => ({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundColor: theme.palette.common.white,
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
  overflowX:'clip'
}));

export default function MainLayout() {
  const { width } = useScreenSize();

  return (
    <SkillsDrawerContextProvider>
      <Wrapper sx={{ flexDirection: width <= MobileWidth ? 'column' : 'row' }}>
        {width > MobileWidth && <Sidebar />}
        {width <= MobileWidth && <Header />}
        <MainBox sx={width > MobileWidth ? { marginLeft: "4.4rem", width: 'calc(100% - 4.4rem)' } : { height: 'calc(100% - 1rem)' }}>
          <AllRoutes />
        </MainBox>
        {width <= MobileWidth && <MobileNavbar />}
      </Wrapper>
    </SkillsDrawerContextProvider>
  );
}
