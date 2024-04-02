import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, IconButton, Typography, alpha, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import TitleBox from "ui/components/shared/TitleBox";
import RadioButtons from "ui/components/shared/RadioButtons";
import TextBox from "ui/components/shared/TextBox";
import { Languages, MobileWidth, TextSizes } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";
import { SubmitButton } from "ui/components/shared/SubmitButton";
import ImageComponent from "ui/components/shared/ImageComponent";
import PersonImage from 'assets/images/person.jpg'
import CameraIcon from 'assets/icons/camera.png'
import { TextSizeContext } from "data/index";
import ImageUploadModal from "../modals/ImageUploadModal";
import { PersonalTabPropType } from "entities/interfaces";
import WithPersonalTabData from "ui/containers/settings/PersonalTabContainer";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: '60%',
  // height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
  flexShrink:0,
}));

const ImageBox = styled(Box)(() => ({
  display: "flex",
  marginBottom: '1.5rem',
  alignItems: 'center',
  columnGap: '2rem'
}));

const ImageButton = styled(IconButton)(() => ({
  display: "flex",
  padding: 0,
}));

const ImageButtonIconBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[300], 0.4),
  width: '100%',
  height: '50%',
  marginTop: '50%',
  borderRadius: '0 0 5rem 5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ImageLabelBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',

}));

const PersonalTab = ({userData, updateUserData, uploadImage}:PersonalTabPropType) => {
  const theme = useTheme()
  const { state: textSize } = useContext(TextSizeContext)
  const { width } = useScreenSize()
  const { i18n, t } = useTranslation();
  const [imageModal, setImageModal] = useState(false);
  const [error, setError] = useState({firstName:'', email:''});
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") === "de" ? 0 : 1
  );
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setFormData(userData)
  }, [userData]);

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
    if (key === "firstName") setError({...error, firstName:''})
    if (key === "email") setError({...error, email:''})
    setSaveDisabled(false)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImageChange = (image: string) => {
    setFormData({
      ...formData,
      image: image,
    });
    setSaveDisabled(false)
  };

  const handleSave = async () => {
    if(formData.firstName==='' && formData.email===''){
      setError({firstName:'Firstname is required!', email:'Email is required!'})
    }else if(formData.firstName===''){
      setError({ ...error,firstName:'Firstname is required!'})
    }else if(formData.email===''){
      setError({ ...error, email:'Email is required!'})
    }else{
      const resp = await updateUserData(formData)
      if(resp.status===200)
        setSaveDisabled(true)
    }
  }

  return (
    <WrapperBox sx={width <= MobileWidth ? { width: '100%' } : { minWidth: "36rem" }}>
      <TitleBox title="Personal Data" padding={width > MobileWidth ? "1rem 2rem" : '1rem'}>
        {/* <FileInput value={formData.image} onChange={handleImageChange} /> */}
        <ImageBox>
          <ImageButton onClick={()=>{setImageModal(true)}}>
            <ImageComponent src={formData.image || PersonImage} alt='uploadImage' width="6.25rem" height="6.25rem" borderRadius="50%" />
            <ImageButtonIconBox>
              <ImageComponent src={CameraIcon} alt='uploadImage' width="1.5rem" height="1.5rem" />
            </ImageButtonIconBox>
          </ImageButton>
          <ImageLabelBox>
            <Typography fontWeight={500} fontSize={TextSizes[textSize].body} color={theme.palette.text.secondary}>{t('Profile picture')}</Typography>
            <Typography fontWeight={400} fontSize={parseInt(TextSizes[textSize].subhead)-1} color={theme.palette.text.secondary}>{t('A Profile picture helps personalize  your account')}</Typography>
          </ImageLabelBox>
        </ImageBox>
        <TextBox
          label="First Name"
          value={formData.firstName}
          onChange={(e: any) => handleFormChange(e, "firstName")}
          error={error.firstName}
          isRequired
        />
        <TextBox
          label="Last Name"
          value={formData.lastName}
          onChange={(e: any) => handleFormChange(e, "lastName")}
        />
        <TextBox
          label="E-Mail"
          value={formData.email}
          onChange={(e: any) => handleFormChange(e, "email")}
          error={error.email}
          isRequired
        />
        <SubmitButton color='primary' onClick={handleSave} disabled={saveDisabled}>Save</SubmitButton>
      </TitleBox>
      <TitleBox title="Language">
        <RadioButtons
          options={Languages}
          onChange={handleLanguageChange}
          value={currentLanguage}
        />
      </TitleBox>
      {imageModal && <ImageUploadModal closeModal={()=>{setImageModal(false)}} imageUrl={formData.image} setImageUrl={handleImageChange} uploadImage={uploadImage}/>}
    </WrapperBox>
  );
};

export default WithPersonalTabData(PersonalTab);
