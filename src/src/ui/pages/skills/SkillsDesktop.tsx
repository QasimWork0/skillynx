import React, { useContext } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import Drawer from "ui/components/shared/Drawer";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";
import MenuIcon from 'assets/icons/menu.png'
import TrashIcon from 'assets/icons/trash.png'
import SkillsChatWrapper from "ui/containers/skills/SkillsChatWrapper";

const Wrapper = styled(Box)(({ theme }) => ({
    flexGrow: '1',
    display: 'flex',
    height: 'calc(100% - 5rem)',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
    flexGrow: '1',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const SkillsDesktop = ({ options, active, setActive, deleteUserCourse, updateProgress }: any) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)

    const SkillMenu = [
        {
            title: 'Move',
            icon: MenuIcon,
            color: theme.palette.text.primary,
            clickHandler: () => { },
        },
        {
            title: 'Delete',
            icon: TrashIcon,
            color: theme.palette.error.main,
            clickHandler: deleteUserCourse,
        }
    ]

    return (
        <Wrapper>
            <Drawer
                active={active}
                setActive={setActive}
                options={options}
                menu={SkillMenu}
                title='Skills'
            />
            <ContentWrapper>
                {active && active.title ? (
                    <SkillsChatWrapper active={active} updateProgress={updateProgress}/>
                ) : (
                    <Typography
                        color="primary" fontWeight="Bold" textAlign='center'
                        fontSize={'3rem' || TextSizes[textSize].extraLargeTitle}>
                        {t("Start your first Skill")}!
                    </Typography>
                )}
            </ContentWrapper>
        </Wrapper>
    )
}

export default SkillsDesktop