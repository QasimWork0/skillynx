import React, { useContext } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { MobileWidth, TextSizes } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const SettingsCard = ({ label, image }: any) => {
  const { width } = useScreenSize()
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation()
  const theme = useTheme();

  return (
    <Wrapper sx={width <= MobileWidth ? {
      padding: '0 1rem',
      gap: '1.2rem'
    } : {}}>
      <ImageComponent
        src={image}
        alt="skill"
        width="2.6rem"
        height="2.6rem"
        filterAllowed
      />
      <Typography
        sx={{
          fontWeight: "bold",
          padding: "1rem",
          color: theme.palette.common.black,
          fontSize: TextSizes[textSize].title3,
        }}
      >
        {t(label)}
      </Typography>
    </Wrapper>
  );
};

export default SettingsCard;
