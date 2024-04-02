import React, { useContext } from "react";
import { Box, Button, IconButton, Modal, Typography, styled } from "@mui/material";
import CrossIcon from "assets/icons/Cancel.png";
import ImageComponent from "ui/components/shared/ImageComponent";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'transparent',
}));

const ReportBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "2rem 0 2rem 0",
  position: "fixed",
  top: "16rem",
  // bottom: "10rem",
  left: "12rem",
  right: "10rem",
  boxShadow: `0px 2px 8px ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.2)"
    : "rgba(255, 255, 255, 0.2)"
    }`,
  display: "flex",
  flexDirection: 'column',
  alignItems: "flex-end",
  justifyContent: "flex-start",
  padding: "0.6rem 3rem",
  [theme.breakpoints.down('md')]: {
    left: "5rem",
    right: "5rem",
    padding: "0.6rem 2rem",
  },
  [theme.breakpoints.down('sm')]: {
    left: "1rem",
    right: "1rem",
    adding: "0.6rem 1rem",
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  alignSelf: "flex-end",
  margin: "-2rem -4.4rem",
  [theme.breakpoints.up('md')]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: `0px 2px 8px ${theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)"
      }`,
    ":hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  [theme.breakpoints.down('md')]: {
    margin: "-2rem -3.4rem",
  },
  [theme.breakpoints.down('sm')]: {
    margin: "-0.6rem -2rem",
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 1.4rem',
  gap: '2rem'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bolder'
}));

const ReportButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
}));

const ReportButton = ({ fontSize, text }: any) => (
  <Button color="secondary" variant='contained'
    sx={theme => (
      {
        fontSize: fontSize,
        backgroundColor: theme.palette.common.white,
        textTransform: 'none',
        justifyContent: 'flex-start',
        padding: '0.8rem 1rem',
        borderRadius: '1rem',
        textAlign: 'left'
      }
    )}
  >
    {text}
  </Button>
)

const ReportModal = ({ closeModal }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation()

  return (
    <StyledModal
      open={true}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <ReportBox>
        <ContentWrapper>
          <Box>
            <Title sx={{ fontSize: TextSizes[textSize].title2 }}>{t('Report')}</Title>
            <Typography sx={{ fontSize: TextSizes[textSize].body }}>{t('What problem would you like to report?')}</Typography>
          </Box>
          <ReportButtonBox>
            <ReportButton text={t('The content seems to be wrong')} fontSize={TextSizes[textSize].body} />
            <ReportButton text={t('The content is not sufficient as an explaination')} fontSize={TextSizes[textSize].body} />
            <ReportButton text={t('I consider this content inappropriate')} fontSize={TextSizes[textSize].body} />
            <ReportButton text={t('Other')} fontSize={TextSizes[textSize].body} />
          </ReportButtonBox>
        </ContentWrapper>
        <CloseButton onClick={closeModal}>
          <ImageComponent
            src={CrossIcon}
            alt="cose"
            width="2.5rem"
            height="2.5rem"
            filterAllowed
          />
        </CloseButton>
      </ReportBox>
    </StyledModal>
  );
};

export default ReportModal;
