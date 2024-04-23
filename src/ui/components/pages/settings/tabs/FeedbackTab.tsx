import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import ChatComponent from "../../../chat/ChatComponent";
import WithFeedbackTabData from "ui/containers/settings/FeedbackTabContainer";
import { FeedbackTabPropType } from "entities/interfaces";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";

const WrapperBox = styled(Box)(({ theme }) => ({
  width: 'calc(100% + 4rem)',
  height: '100%',
  margin: '0 -2rem',
}));

const FeedbackTab = ({ feedbackData, addFeedback }: FeedbackTabPropType) => {
  const [sendDisabled, setSendDisabled] = useState(false);
  const { width } = useScreenSize()

  const handleSendfeedback = async (content: string) => {
    setSendDisabled(true)
    await addFeedback(content)
    setSendDisabled(false)
  }
  return (
    <WrapperBox sx={width<=MobileWidth? {width: 'calc(100% + 1.8rem)', height: '100%', margin: '0 -1rem'}:{}}>
      <ChatComponent messagesData={feedbackData} sendMessage={handleSendfeedback} sendDisabled={sendDisabled} />
    </WrapperBox>
  );
};

export default WithFeedbackTabData(FeedbackTab);
