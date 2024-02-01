import React, {  } from "react";
import { Box, styled } from "@mui/material";
import DrawerHeader from "ui/components/shared/DrawerHeader";
import SettingsDrawer from "ui/components/pages/settings/SettingsDrawer";

const ContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: "1rem",
    display: "flex",
    height: "calc(100% - 8rem)",
}));

const SettingsDesktop = ({options, active, setActive}:any) => {
    return (
        <>
            <Box>
                <SettingsDrawer
                    active={active}
                    setActive={setActive}
                    options={options}
                />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", }}>
                <DrawerHeader data={active} isSetting />
                <ContentWrapper>{active.component}</ContentWrapper>
            </Box>
        </>
    )
}

export default SettingsDesktop