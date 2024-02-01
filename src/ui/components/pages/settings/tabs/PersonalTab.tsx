import React, { ChangeEvent, useContext, useState } from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import TitleBox from "ui/components/shared/TitleBox";
import RadioButtons from "ui/components/shared/RadioButtons";
import TextBox from "ui/components/shared/TextBox";
import FileInput from "ui/components/shared/FileInput";
import { Languages, MobileWidth, TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";
import useScreenSize from "hooks/ScreenSize";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: '60%',
  height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.6rem",
  color: theme.palette.common.white,
  fontSize: "1.1rem",
  fontWeight: "bolder",
  width: "50%",
  textTransform: "none",
}));

const RequiredLabel = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  alignSelf: "flex-end",
  lineHeight: "0.8rem",
}));

const PersonalTab = () => {
  const { width } = useScreenSize()
  const { state: textSize } = useContext(TextSizeContext)
  const { i18n, t } = useTranslation();
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") === "de" ? Languages[0] : Languages[1]
  );

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
    if (key === "firstName") setError(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleLanguageChange = (event: any) => {
    setCurrentLanguage(event.target.value);
    changeLanguage("en");
    switch (event.target.value) {
      case Languages[0]:
        changeLanguage("de");
        break;
      case Languages[1]:
        changeLanguage("en");
        break;
    }
  };

  const handleImageChange = (image: string) => {
    setFormData({
      ...formData,
      image: image,
    });
  };

  return (
    <WrapperBox sx={width<=MobileWidth? { width:'100%' }:{  minWidth: "36rem"}}>
      <TitleBox title="Personal Data" padding={width>MobileWidth ? "1rem 2rem": '1rem'}>
        <FileInput value={formData.image} onChange={handleImageChange} />
        <TextBox
          label={`${t("First Name")}:*`}
          value={formData.firstName}
          onChange={(e: any) => handleFormChange(e, "firstName")}
          error={error}
        />
        <TextBox
          label={`${t("Last Name")}:`}
          value={formData.lastName}
          onChange={(e: any) => handleFormChange(e, "lastName")}
        />
        <TextBox
          label={`${t("E-Mail")}:`}
          value={formData.email}
          onChange={(e: any) => handleFormChange(e, "email")}
        />
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
            <RequiredLabel fontSize={TextSizes[textSize].body}>*{t("required")}</RequiredLabel>
            <SubmitButton variant="contained" sx={{fontSize:TextSizes[textSize].body}}>{t("Save")}</SubmitButton>
          </Grid>
        </Grid>
      </TitleBox>
      <TitleBox title="Language">
        <RadioButtons
          options={Languages}
          onChange={handleLanguageChange}
          value={currentLanguage}
        />
      </TitleBox>
    </WrapperBox>
  );
};

export default PersonalTab;
