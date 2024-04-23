import React, { useContext, useLayoutEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { BackgroundContext } from "data/index";
import BackgroundImage2 from "assets/images/Background_Chat.png";
import BackgroundImage1 from "assets/images/Background.png";
import ChatComponent from "../../../chat/ChatComponent";
import CustomModal from "ui/components/shared/CustomModal";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import { ParagraphInterface } from "entities/interfaces";

const ContentBox = styled(Box)<{ backgroundimagenumber: string }>(({ theme, backgroundimagenumber }) => ({
  backgroundImage: backgroundimagenumber === '1' ? `url(${BackgroundImage1})` : backgroundimagenumber === '2' ? `url(${BackgroundImage2})` : 'none',
  backgroundColor: backgroundimagenumber === '3' ? theme.palette.secondary.main : theme.palette.common.white,
  backgroundSize: "cover",
  display: "flex",
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 0.1rem 0.1rem 0.1rem',
  borderRadius: "0 0 1rem 1rem",
  overflowY: "auto",
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
}));

const SkillModal = ({ closeModal, getChapterHistory }: { closeModal:()=>void, getChapterHistory: () => Promise<ParagraphInterface[]>}) => {
  const { state: backgroundImage } = useContext(BackgroundContext)
  const { width } = useScreenSize()
  const [chatHistory, setChatHistory] = useState<ParagraphInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getChatHistory = async() => {
    const data = await getChapterHistory()
    setChatHistory(data)
    setIsLoading(false)
  }

  useLayoutEffect(() => {
    getChatHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomModal closeModal={closeModal} width={width > MobileWidth ? '85.5rem' : '90%'} height='45.25rem' title='Chat History'>
      <ContentBox backgroundimagenumber={backgroundImage.toString()}>
        <ChatComponent messagesData={chatHistory} typingNotAllowed isInModal isLoading={isLoading} isHome={width>MobileWidth}/>
      </ContentBox>
    </CustomModal>
  );
};

export default SkillModal;

