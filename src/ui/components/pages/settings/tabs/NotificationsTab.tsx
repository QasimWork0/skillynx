import React, { useContext, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { NotificationPrompts, TextSizes } from "entities/constants";
import RadioButtons from "ui/components/shared/RadioButtons";
import TitleBox from "ui/components/shared/TitleBox";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "50%",
  height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const Remainder = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  [theme.breakpoints.up('sm')]: {
    padding: '0 2rem'
  }
}));

const NotificationsTab = () => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)
  const [notificationPrompt, setNotificationPrompt] = useState(Object.keys(NotificationPrompts)[0]);
  const [getNewInformation, setGetNewInformation] = useState('Yes');
  const [getCommunityInformation, setGetCommunityInformation] = useState('Yes');
  const [remainderMessage, setRemainderMessage] = useState(NotificationPrompts.Frequent);

  const handleNotificationPromptChange = (event: any) => {
    setNotificationPrompt(event.target.value);
    setRemainderMessage(NotificationPrompts[event.target.value as 'Frequent' | 'Moderate' | 'Rare' | 'Off'])
  };

  const handleGetNewInformationChange = (event: any) => {
    setGetNewInformation(event.target.value);
  };

  const handleGetCommunityInformationChange = (event: any) => {
    setGetCommunityInformation(event.target.value);
  };

  return (
    <WrapperBox>
      <TitleBox title="Gentle prompts to continue on your path">
        <RadioButtons
          options={Object.keys(NotificationPrompts)}
          onChange={handleNotificationPromptChange}
          value={notificationPrompt}
        />
        <Remainder fontSize={TextSizes[textSize].body}>{t(remainderMessage)}</Remainder>
      </TitleBox>
      <TitleBox title="Get information about new skills and updates">
        <RadioButtons
          options={['Yes', 'No']}
          onChange={handleGetNewInformationChange}
          value={getNewInformation}
        />
      </TitleBox>
      <TitleBox title="Get information about community interactions">
        <RadioButtons
          options={['Yes', 'No']}
          onChange={handleGetCommunityInformationChange}
          value={getCommunityInformation}
        />
      </TitleBox>
    </WrapperBox>
  );
};

export default NotificationsTab;
