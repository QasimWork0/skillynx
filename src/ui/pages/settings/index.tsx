import React, { ReactNode, useState } from "react";
import { Box, styled } from "@mui/material";
import { MobileWidth, SettingsMenu } from "entities/constants";
import SettingsDesktop from "./SettingsDesktop";
import useScreenSize from "hooks/ScreenSize";
import SettingsListView from "ui/components/mobile/settings/SettingsListView";

const SettingsWrapper = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
}));


const Settings = () => {
  const { width } = useScreenSize()
  const [active, setActive] = useState<{
    label: string;
    image: string;
    component: ReactNode;
  }>(width > MobileWidth ? SettingsMenu[0] : {
    label: '',
    image: '',
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
