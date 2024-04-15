import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import ChatComponent from "../../../chat/ChatComponent";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import ChatComponentMobile from "ui/components/chat/ChatComponentMobile";
import WithFeedbackTabData from "ui/containers/settings/FeedbackTabContainer";
import { FeedbackTabPropType } from "entities/interfaces";

const WrapperBox = styled(Box)(({ theme }) => ({
  width: 'calc(100% + 4rem)',
  height: '100%',
  margin: '0 -2rem',
}));

const FeedbackTab = ({ feedbackData, addFeedback }: FeedbackTabPropType) => {
  const { width } = useScreenSize()
  const [sendDisabled, setSendDisabled] = useState(false);

  const handleSendfeedback = async (content: string) => {
    setSendDisabled(true)
    await addFeedback(content)
    setSendDisabled(false)
  }
  return (
    <WrapperBox>
      {width > MobileWidth ?
        <ChatComponent messagesData={feedbackData} sendMessage={handleSendfeedback}
          sendDisabled={sendDisabled}
        />
        :
        <ChatComponentMobile />}
    </WrapperBox>
  );
};

export default WithFeedbackTabData(FeedbackTab);
