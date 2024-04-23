import React, { useContext } from "react";
import { Box, IconButton, Modal, Typography, styled } from "@mui/material";
import CrossIcon from "assets/icons/Cancel.png";
import ImageComponent from "ui/components/shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import {  TextSizes } from "entities/constants";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'transparent',
}));

const Wrapper = styled(Box)(({ theme }) => ({ 
  backgroundColor: theme.palette.common.white,
  position: "fixed",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: 'column',
  maxWidth:'90%',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: '100%',
  height: '5rem',
  alignItems: 'center',
  padding: '0 1.5rem',
  flexShrink: 0,
}));

const HeaderLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  flexGrow: 1
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  width: "2rem",
  height: "2rem"
}));

const CustomModal = ({ closeModal, children, width, height, title, padding = '', margin = '' }: any) => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)

  return (
    <StyledModal open={true}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Wrapper width={width} height={height}>
        <HeaderBox>
          <HeaderLabel fontSize={TextSizes[textSize].title3}>{t(title)}</HeaderLabel>
          <CloseButton onClick={closeModal}>
            <ImageComponent src={CrossIcon} alt="close" width="1.25rem" height="1.25rem" filterAllowed />
          </CloseButton>
        </HeaderBox>
        {children}
      </Wrapper>
    </StyledModal>
  );
};

export default CustomModal;
