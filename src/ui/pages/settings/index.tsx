import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { MobileWidth, SettingsMenu } from "entities/constants";
import SettingsDesktop from "./SettingsDesktop";
import useScreenSize from "hooks/ScreenSize";
import SettingsListView from "ui/components/mobile/settings/SettingsListView";
import { DrawerPropType } from "entities/interfaces";

const SettingsWrapper = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  flexDirection:'column',
}));

const Settings = () => {
  const { width } = useScreenSize()
  const [active, setActive] = useState<DrawerPropType>(width > MobileWidth ? SettingsMenu[0] : {
    title: '',
    thumbnail: '',
    thumbnailDark: '',
    component: <></>
  });

  return (
    <SettingsWrapper>
      {width > MobileWidth ? (
        <SettingsDesktop options={SettingsMenu} active={active} setActive={setActive} />
      ) : (
        <SettingsListView options={SettingsMenu} active={active} setActive={setActive} />
      )}

    </SettingsWrapper>
  );
};

export default Settings;
