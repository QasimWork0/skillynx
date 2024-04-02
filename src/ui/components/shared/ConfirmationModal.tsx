import React, { useContext } from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { MobileWidth, TextSizes } from "entities/constants";
import { SubmitButton } from "ui/components/shared/SubmitButton";
import CustomModal from "ui/components/shared/CustomModal";
import useScreenSize from "hooks/ScreenSize";

const ContentBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: '0 1.5rem 1.5rem 1.5rem',
}));

const NoteBox = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 400,
    padding: '0 1rem'
}));


const ButtonBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: '50%',
    height: '3.75rem',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    alignSelf: 'flex-end',
}));

const ConfirmationModal = ({ closeModal, handleConfirm, title, description, confirmColor='error' }: any) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    const { width } = useScreenSize()

    return (
        <CustomModal closeModal={closeModal} width={width > MobileWidth ? '32rem':'23.75rem'} height='14rem' title={title}>
            <ContentBox>
                <NoteBox  sx={ {fontSize: TextSizes[textSize].callout} }>{t(description)}</NoteBox>
                <ButtonBox>
                    <SubmitButton color={confirmColor} onClick={handleConfirm}>Confirm</SubmitButton>
                    <SubmitButton color='primary' variant='outlined' fontColor={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.common.black} onClick={closeModal}>Cancel</SubmitButton>
                </ButtonBox>
            </ContentBox>
        </CustomModal>
    );
};

export default ConfirmationModal;
