import React, { useContext } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import Drawer from "ui/components/shared/Drawer";
import { TextSizeContext } from "data/index";
import ChatComponent from "ui/components/chat/ChatComponent";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";
import MenuIcon from 'assets/icons/menu.png'
import TrashIcon from 'assets/icons/trash.png'

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
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        width: "0.4rem",
        height: '0.4rem',
    },
    "&::-webkit-scrollbar-track": {
        background: theme.palette.secondary.main,
    },
    "&::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.dark,
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: theme.palette.grey[700],
    },
    marginRight: '0.1rem',
}));

const SkillsDesktop = ({ options, active, setActive, deleteUserCourse, nodesData }: any) => {
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
                    <ChatComponent
                        messagesData={nodesData}
                        date={new Date()}
                        sendDisabled
                        chapter={{
                            title: 'The first steps of negotiation and what to expect',
                            num: 1
                        }}
                    />
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