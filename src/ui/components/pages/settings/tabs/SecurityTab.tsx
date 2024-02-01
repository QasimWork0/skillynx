import React, { ChangeEvent, useContext, useState } from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import TitleBox from "ui/components/shared/TitleBox";
import TextBox from "ui/components/shared/TextBox";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { MobileWidth, TextSizes } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "60%",
  height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.6rem",
  color: theme.palette.common.white,
  fontSize: "1.1rem",
  fontWeight: "bolder",
  width: "100%",
  maxWidth: '15rem',
  textTransform: "none",
  marginTop: "1rem",
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 'bolder',
  color: theme.palette.common.black,
  marginLeft: '-1rem',
  marginBottom: '2rem',
}));

const SecurityTab = () => {
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation()
  const { width } = useScreenSize()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  return (
    <WrapperBox>
      <TitleBox title={width > MobileWidth ? "Password" : "Change Password"} padding={width > MobileWidth ? "1rem 2rem" : '1rem'}>
        {width > MobileWidth && <Label fontSize={TextSizes[textSize].title3}>{t('Change Password')}</Label>}
        <TextBox
          label={`${t("Current Password")}:`}
          value={formData.currentPassword}
          onChange={(e: any) => handleFormChange(e, "currentPassword")}
          type="password"
          gridXs={width>MobileWidth?[4,8]:[6,6]}
        />
        <TextBox
          label={`${t("New Password")}:`}
          value={formData.newPassword}
          onChange={(e: any) => handleFormChange(e, "newPassword")}
          type="password"
          gridXs={width>MobileWidth?[4,8]:[6,6]}
        />
        <TextBox
          label={`${t("Confirm Password")}:`}
          value={formData.confirmPassword}
          onChange={(e: any) => handleFormChange(e, "confirmPassword")}
          type="password"
          gridXs={width>MobileWidth?[4,8]:[6,6]}
        />
        <Grid container>
          <Grid item xs={width>MobileWidth?4:6} />
          <Grid item xs={width>MobileWidth?4:5}>
            <SubmitButton variant="contained" sx={{ fontSize: TextSizes[textSize].body }}>{t('Save')}</SubmitButton>
          </Grid>
        </Grid>
      </TitleBox>
      <TitleBox title="Delete Account" padding="2rem">
        <SubmitButton variant="contained" color="error" sx={{ fontSize: TextSizes[textSize].body, width: '15rem' }}>
          {t('Delete Account')}
        </SubmitButton>
      </TitleBox>
    </WrapperBox>
  );
};

export default SecurityTab;
