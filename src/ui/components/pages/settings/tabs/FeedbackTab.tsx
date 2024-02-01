import React from "react";
import { Box, styled } from "@mui/material";
import ChatComponent from "../../home/ChatComponent";
import BackgroundImage from "assets/images/Background_Chat.png";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import ChatComponentMobile from "ui/components/mobile/home/ChatComponentMobile";

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundColor: theme.palette.common.white,
  backgroundSize: "cover",
  width: '100%',
  height: '100%'
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
