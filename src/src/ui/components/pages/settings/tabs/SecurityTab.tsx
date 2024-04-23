import React, { ChangeEvent, useState } from "react";
import { Box, styled } from "@mui/material";
import TitleBox from "ui/components/shared/TitleBox";
import TextBox from "ui/components/shared/TextBox";
import { useTranslation } from "react-i18next";
import { MobileWidth } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";
import { SubmitButton } from "ui/components/shared/SubmitButton";
import WithSecurityTabData from "ui/containers/settings/SecurityTabContainer";
import { ChangePasswordInterface, SecurityTabPropType } from "entities/interfaces";
import ConfirmationModal from "ui/components/shared/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "60%",
  // height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const SecurityTab = ({ updatePassword, deleteAccount }: SecurityTabPropType) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { width } = useScreenSize()
  const [formData, setFormData] = useState<ChangePasswordInterface>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [error, setError] = useState<ChangePasswordInterface>({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
    setSaveDisabled(false)
    setError({...error, [key]:''})
  };

  const handleSave = async () => {
    if (formData.oldPassword === '' && formData.newPassword === '') {
      setError({ ...error, oldPassword: 'Current password is required!', newPassword: 'New password is required!' })
    } else if (formData.oldPassword === '') {
      setError({ ...error, oldPassword: 'Current password is required!' })
    } else if (formData.newPassword === '') {
      setError({ ...error, newPassword: 'New password is required!' })
    } else if (formData.newPassword !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Password didn't match!" })
    } else {
      const resp = await updatePassword(formData)
      if (resp.status === 200)
        setSaveDisabled(true)
    }
  }

  const handleDelete = async () => {
    const resp = await deleteAccount()
    if(resp.status === 200){
      localStorage.removeItem('currentUserName')
      localStorage.removeItem('currentUserToken')
      navigate('/auth')
    }
  }

  return (
    <WrapperBox>
      <TitleBox title='Change Password' padding={width > MobileWidth ? "1rem 2rem" : '1rem'}
        label='Settings and recommendations to help you keep your account secure'>
        <TextBox
          label={`${t("Current Password")}`}
          value={formData.oldPassword}
          onChange={(e: any) => handleFormChange(e, "oldPassword")}
          type="password"
          error={error.oldPassword}
          isRequired
        />
        <TextBox
          label={`${t("New Password")}`}
          value={formData.newPassword}
          onChange={(e: any) => handleFormChange(e, "newPassword")}
          type="password"
          error={error.newPassword}
          isRequired
        />
        <TextBox
          label={`${t("Confirm Password")}`}
          value={formData.confirmPassword}
          onChange={(e: any) => handleFormChange(e, "confirmPassword")}
          type="password"
          error={error.confirmPassword}
          isRequired
        />
        <SubmitButton color='success' onClick={handleSave} disabled={saveDisabled} >Save</SubmitButton>
      </TitleBox>
      <TitleBox title="Delete Account"
        label='Deleting your account will remove all of your information from out database. This cannot be undone.'>
        <SubmitButton color='error' onClick={() => setDeleteConfirmationModal(true)}>Delete Account</SubmitButton>
      </TitleBox>
      {deleteConfirmationModal &&
        <ConfirmationModal closeModal={() => setDeleteConfirmationModal(false)} confirmColor='error'
          handleConfirm={handleDelete} title='Deleting Account' description='Are you sure you want to delete this account?'
        />
      }
    </WrapperBox>
  );
};

export default WithSecurityTabData(SecurityTab);
