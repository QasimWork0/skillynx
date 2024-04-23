import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, styled, useTheme } from "@mui/material";
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
    alignItems: 'center',
    padding: '0 1.5rem 1.5rem 1.5rem',
}));

const NoteBox = styled(TextField)(({ theme }) => ({
    padding: '1rem',
    borderRadius: '4px',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.grey[800],
    height: '100%',
    '.MuiInput-root': {
        fontWeight: 400,
    },
    [theme.breakpoints.up('md')]: {
        '& textarea::-webkit-scrollbar': {
            width: "0.4rem",
            height: '0.4rem',
        },
        '& textarea::-webkit-scrollbar-track': {
            background: theme.palette.secondary.main,
        },
        '& textarea::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.dark,
            borderRadius: "10px",
            cursor: 'pointer',
        },
        '& textarea::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.grey[700],
        },
    }

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

const NoteModal = ({ closeModal, saveNote, getNote }:
    {
        closeModal: () => void,
        saveNote: (note: string) => void,
        getNote: () => Promise<string>
    }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    const { width } = useScreenSize()
    const [note, setNote] = useState('');

    const handleRemove = () => {
        closeModal()
    };

    const handleSave = () => {
        saveNote(encodeURIComponent(note))
        closeModal()
    }

    const getNoteValue = async () => {
        const value = await getNote()
        setNote(decodeURIComponent(value))
    }

    useEffect(() => {
        getNoteValue()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CustomModal closeModal={closeModal} width={width > MobileWidth ? '32rem' : '23.75rem'} height='23.5625rem' title='Write Note'>
            <ContentBox>
                <NoteBox placeholder={t('Place your personal notes for this microlearning….')} fullWidth multiline rows={8} value={note} onChange={(e) => setNote(e.target.value)}
                    variant="standard" InputProps={{ sx: { fontSize: TextSizes[textSize].subhead }, disableUnderline: true }} />
                <ButtonBox>
                    <SubmitButton color='primary' onClick={handleSave}>Save</SubmitButton>
                    <SubmitButton color='primary' variant='outlined' fontColor={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.common.black} onClick={handleRemove}>Cancel</SubmitButton>
                </ButtonBox>
            </ContentBox>
        </CustomModal>
    );
};

export default NoteModal;
