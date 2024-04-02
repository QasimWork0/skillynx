import React, { useContext } from "react";
import { Box, styled } from "@mui/material";
import { BackgroundContext } from "data/index";
import BackgroundImage2 from "assets/images/Background_Chat.png";
import BackgroundImage1 from "assets/images/Background.png";
import ChatComponent from "../../home/ChatComponent";
import CustomModal from "ui/components/shared/CustomModal";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import ChatComponentMobile from "ui/components/mobile/home/ChatComponentMobile";

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
  padding: '0 1.4rem 1.4rem 1.4rem',
  borderRadius: "0 0 1rem 1rem",
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
}));

const SkillModal = ({ closeModal }: any) => {
  const { state: backgroundImage } = useContext(BackgroundContext)
  const { width } = useScreenSize()

  return (
    <CustomModal closeModal={closeModal} width={width > MobileWidth ? '85.5rem' : '23.75rem'} height='45.25rem' title='Chat History'>
      <ContentBox backgroundimagenumber={backgroundImage.toString()}>
        {width > MobileWidth ?
          <ChatComponent typingNotAllowed isInModal />
          :
          <ChatComponentMobile typingNotAllowed/>
        }
      </ContentBox>
    </CustomModal>
  );
};

export default SkillModal;

