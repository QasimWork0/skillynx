import React, { } from "react";
import { Box, styled } from "@mui/material";
import Drawer from "ui/components/shared/Drawer";
import Header from "ui/components/shared/Header";

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    height:'calc(100vh - 5rem)',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: "0rem 2rem",
  display: "flex",
  flexGrow:1,
  height:'100%',
  overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
      height: '0.4rem',
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.secondary.main,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.dark,
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.grey[700],
    },
    marginRight: '0.1rem',
    paddingBottom: '2rem',
    flexShrink: 0,
}));

const SettingsDesktop = ({ options, active, setActive }: any) => {
    return (
        <>
            <Header data={active} isSetting />
            <Wrapper>
                <Drawer
                    active={active}
                    setActive={setActive}
                    options={options}
                    title= 'Settings'
                    isSettings
                />
                <ContentWrapper>{active.component}</ContentWrapper>
            </Wrapper>
        </>
    )
}

export default SettingsDesktop