import React, { useContext } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: '0.25rem 0.75rem 0.25rem 1.25rem',
  gap: '1rem',
  height: '5.25rem',
  flexShrink: 0,
}));

const SettingsCard = ({ label, image, imageDark }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation()
  const theme = useTheme();

  return (
    <Wrapper>
      <ImageComponent
        src={theme.palette.mode==='light'? image:imageDark}
        alt="logo"
        width="3rem"
        height="3rem"
      />
      <Typography
        sx={{
          fontWeight: 700,
          padding: "1rem",
            fontSize: TextSizes[textSize].callout,
        }}
      >
        {t(label)}
      </Typography>
    </Wrapper>
  );
};

export default SettingsCard;
