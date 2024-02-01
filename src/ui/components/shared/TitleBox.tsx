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
  color: theme.palette.common.black,
  fontWeight: "bolder",
}));

const ChildBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: '0.8rem'
  }));

const TitleBox = ({ title, children, padding='1rem' }: any) => {
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext);
  return (
    <Wrapper>
      <Title fontSize={TextSizes[textSize].title2}>{t(title)}</Title>
      <ChildBox padding={padding}>{children}</ChildBox>
    </Wrapper>
  );
};

export default TitleBox;
