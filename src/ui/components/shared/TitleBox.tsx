import React, { useContext } from "react";
import { Typography, styled, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode==='light'? theme.palette.common.black: theme.palette.text.primary,
  fontWeight: 500,
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  padding: '1.4rem 0',
  width: '100%',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'center',
  gap: '0.6rem',
}));

const ChildBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: '360px',
}));

const TitleBox = ({ title, children, label = undefined }: any) => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext);
  return (
    <Wrapper>
      <TitleWrapper>
        <Title fontSize={TextSizes[textSize].title2}>{t(title)}</Title>
        {label && <Label fontSize={parseInt(TextSizes[textSize].subhead)-1}>{t(label)}</Label>}
      </TitleWrapper>
      <ChildBox>{children}</ChildBox>
    </Wrapper>
  );
};

export default TitleBox;
