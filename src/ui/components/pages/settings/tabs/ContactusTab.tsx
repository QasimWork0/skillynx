import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import TitleBox from "ui/components/shared/TitleBox";
import { Contact, Innucation, TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "50%",
  height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const Text = styled(Typography)(() => ({
  lineHeight: '3rem'
}));

const ContactusTab = () => {
  const { state: textSize } = useContext(TextSizeContext)
  return (
    <WrapperBox>
      <TitleBox title="INNUCATION" padding='0'>
        <Text fontSize={TextSizes[textSize].body}>{Innucation}</Text>
      </TitleBox>
      <TitleBox title="Contact" padding='0'>
        <Text fontSize={TextSizes[textSize].body}>{Contact}</Text>
      </TitleBox>
    </WrapperBox>
  )
};

export default ContactusTab;
