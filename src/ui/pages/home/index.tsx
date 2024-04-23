import React from "react";
import ChatComponent from "ui/components/chat/ChatComponent";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import Header from "ui/components/shared/Header";
import { Box, styled } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '51rem',
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
  margin: '0.1rem',
}));

const Home = () => {
  const { width } = useScreenSize();
  return (
    <>
      {width > MobileWidth ?
        (
          <>
            <Header />
            <Wrapper>
              <ChatComponent messagesData={[]} />
            </Wrapper>
          </>
        ) :
        <ChatComponent messagesData={[]} />
      }
    </>
  );
};

export default Home;
