import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { NotificationPrompts, TextSizes } from "entities/constants";
import RadioButtons from "ui/components/shared/RadioButtons";
import TitleBox from "ui/components/shared/TitleBox";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { NotficationSettingInterface, NotificationsTabPropType } from "entities/interfaces";
import WithNotificationsTabData from "ui/containers/settings/NotificationsTabContainer";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "100%",
  height: "100%",
  padding: "1.4rem 0.8rem",
}));

const Remainder = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
}));

const NotificationsTab = ({ notificationSettings, updateNotificationSettings }: NotificationsTabPropType) => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)
  const [notification, setNotification] = useState<NotficationSettingInterface>({
    notification1: 0,
    notification2: 0,
    notification3: 0
  });

  useEffect(() => {
    setNotification(notificationSettings)
  }, [notificationSettings]);

  const handleChange = (event: any, key:string) => {
    setNotification({ ...notification, [key]: event.target.value });
    updateNotificationSettings({ ...notification, [key]: event.target.value })
  };

  return (
    <WrapperBox>
      <TitleBox title="Gentle prompts to continue on your path">
        <RadioButtons
          options={['Frequent', 'Moderate', 'Rare', 'Off']}
          onChange={(event: any)=>handleChange(event, 'notification1')}
          value={notification.notification1}
        />
        <Remainder fontSize={TextSizes[textSize].body}>{t(NotificationPrompts[notification.notification1])}</Remainder>
      </TitleBox>
      <TitleBox title="Get information about new skills and updates">
        <RadioButtons
          options={['Yes', 'No']}
          onChange={(event: any)=>handleChange(event, 'notification2')}
          value={notification.notification2}
        />
      </TitleBox>
      <TitleBox title="Get information about community interactions">
        <RadioButtons
          options={['Yes', 'No']}
          onChange={(event: any)=>handleChange(event, 'notification3')}
          value={notification.notification3}
        />
      </TitleBox>
    </WrapperBox>
  );
};

export default WithNotificationsTabData(NotificationsTab);
