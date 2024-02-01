import React from "react";
import { Box, IconButton, Modal, styled } from "@mui/material";
import CrossIcon from "assets/icons/Cancel.png";
import ImageComponent from "ui/components/shared/ImageComponent";
import BackgroundImage from 'assets/images/Background_Chat.png'
import ChatComponentMobile from "ui/components/mobile/home/ChatComponentMobile";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'transparent',
}));

const SkillBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundColor: theme.palette.common.white,
  backgroundSize: "cover",
  borderRadius: "2rem 0 2rem 0",
  position: "fixed",
  top: "10rem",
  bottom: "6rem",
  left: "12rem",
  right: "10rem",
  boxShadow: `0px 2px 8px ${
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)"
  }`,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0.6rem 3rem",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 2px 8px ${
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)"
  }`,
  position: "absolute",
  alignSelf: "flex-start",
  marginRight: "-4.4rem",
  marginTop: "-2rem",
  ":hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const SkillModalMobile = ({ closeModal }: any) => {
  return (
    <StyledModal
      open={true}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <SkillBox>
        <ChatComponentMobile typingNotAllowed/>
        <CloseButton onClick={closeModal}>
          <ImageComponent
            src={CrossIcon}
            alt="cose"
            width="2.5rem"
            height="2.5rem"
            filterAllowed
          />
        </CloseButton>
      </SkillBox>
    </StyledModal>
  );
};

export default SkillModalMobile;
