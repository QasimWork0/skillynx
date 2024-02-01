import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import SkillsDrawer from "ui/components/pages/skills/SkillsDrawer";
import { SkillsDrawerContext, TextSizeContext } from "data/index";
import ChatComponent from "ui/components/pages/home/ChatComponent";
import DrawerHeader from "ui/components/shared/DrawerHeader";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";

const ContentWrapper = styled(Box)(() => ({
    height: "calc(100% - 8rem)",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

const SkillsDesktop = ({options, active, setActive}:any) => {
    const { t } = useTranslation();
    const { state: textSize } = useContext(TextSizeContext)
    const { state: showSkillsDrawer } = useContext(SkillsDrawerContext);

    return (
        <>
            <Box>
                {showSkillsDrawer && (
                    <SkillsDrawer
                        active={active}
                        setActive={setActive}
                        options={options}
                    />
                )}
            </Box>
            <Box sx={{ flex: 1 }}>
                <DrawerHeader data={active} />
                <ContentWrapper>
                    {active && active.label ? (
                        <ChatComponent />
                    ) : (
                        <Typography
                            color="primary"
                            fontSize={'3rem' || TextSizes[textSize].largeTitle}
                            fontWeight="Bold"
                            paddingBottom="10rem"
                            textAlign='center'
                        >
                            {t("Start your first Skill")}!
                        </Typography>
                    )}
                </ContentWrapper>
            </Box>
        </>
    )
}

export default SkillsDesktop