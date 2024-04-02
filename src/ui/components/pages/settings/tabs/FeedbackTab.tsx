import React from "react";
import { Box, styled } from "@mui/material";
import ChatComponent from "../../home/ChatComponent";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import ChatComponentMobile from "ui/components/mobile/home/ChatComponentMobile";

const WrapperBox = styled(Box)(({ theme }) => ({
  width: 'calc(100% + 4rem)',
  height: '100%',
  margin: '0 -2rem',
}));

const FeedbackTab = () => {
  const {width} = useScreenSize()
  return (
    <WrapperBox>
      {width>MobileWidth? <ChatComponent />: <ChatComponentMobile/>}
    </WrapperBox>
  );
};

export default FeedbackTab;
