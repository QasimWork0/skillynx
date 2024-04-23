import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { MobileWidth, TextSizes } from "entities/constants";
import { SubmitButton } from "ui/components/shared/SubmitButton";
import PersonImage from 'assets/images/person.jpg'
import CustomModal from "ui/components/shared/CustomModal";
import useScreenSize from "hooks/ScreenSize";

const ContentBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1.5rem 1.5rem 1.5rem',
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: '100%',
    height: '3.75rem',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0'
}));

const ImageUploadModal = ({ closeModal, imageUrl, setImageUrl, uploadImage }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const { width } = useScreenSize()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleChange = () => {
        if (fileInputRef.current)
            fileInputRef.current.click()
    };

    const handleRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSelectedImage(undefined);
        setImageUrl('')
        closeModal()
    };

    const handleSave = async () => {
        let content = ''
        if (selectedImage) {
            let response = await uploadImage(selectedImage)
            if (response.status === 200)
                content = response.content
        }
        setImageUrl(content)
        closeModal()
    }

    return (
        <CustomModal closeModal={closeModal} width={width > MobileWidth ? '25.75rem':'23.75rem'} height='33.3125rem' title='Profile picture'>
            <ContentBox>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="    "
                    multiple={false}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <Typography fontSize={parseInt(TextSizes[textSize].subhead) - 1} sx={{ color: theme.palette.mode === 'light' ? '#3A4754' : '#C2C2C2' }}>{t('A picture helps people recognize you and lets you know when you’re signed in to your account')}</Typography>
                <ImageComponent src={imageUrl ? imageUrl : selectedImage ? URL.createObjectURL(selectedImage) : PersonImage} alt="image" width="14.5rem" height="14.5rem" borderRadius="50%" />
                <ButtonBox>
                    {selectedImage ?
                        <SubmitButton color='primary' onClick={handleSave} width='100%'>Save</SubmitButton>
                        :
                        <SubmitButton color='primary' onClick={handleChange}>Change</SubmitButton>
                    }
                    {!selectedImage && <SubmitButton color='primary' variant='outlined' fontColor={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.common.black} onClick={handleRemove}>Remove</SubmitButton>}
                </ButtonBox>
            </ContentBox>
        </CustomModal>
    );
};

export default ImageUploadModal;
