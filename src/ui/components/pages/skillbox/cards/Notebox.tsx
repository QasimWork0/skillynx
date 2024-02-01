import React, { ChangeEvent, useContext, useState } from 'react'
import { Box, IconButton, TextField, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ImageComponent from 'ui/components/shared/ImageComponent';
import CrossIcon from "assets/icons/Cancel.png";
import { TextSizeContext } from 'data/index';
import { MobileWidth, TextSizes } from 'entities/constants';
import useScreenSize from 'hooks/ScreenSize';

const NoteBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "1rem",
    width: "100%",
    height: "8rem",
    boxShadow: `0px 2px 8px ${theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"
        }`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
}));

const Note = styled(TextField)(() => ({
    padding: "1rem 3rem",
    ".MuiInput-root": {
        lineHeight: "1.3rem",
        fontStyle: "italic",
    },
}));

const CloseButton = styled(IconButton)<{isweb?:string}>(({ theme, isweb }) => ({
    backgroundColor: isweb && theme.palette.common.white,
    boxShadow: isweb && `0px 2px 8px ${theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"
        }`,
    position: "absolute",
    alignSelf: "flex-start",
    marginRight: isweb && "-1rem",
    marginTop: isweb && "-1rem",
    ':hover': {
        backgroundColor: isweb && theme.palette.secondary.dark,
    }
}));

const Notebox = ({ handleClose }: any) => {
    const { t } = useTranslation();
    const [note, setnote] = useState("");
    const { width } = useScreenSize()
    const { state: textSize } = useContext(TextSizeContext)

    const handleNoteChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setnote(e.target.value);
    };

    return (
        <NoteBox>
            <Note
                sx={{ '.MuiInput-root': { fontSize: TextSizes[textSize].body } }}
                placeholder={t(
                    "Place your personal notes for this microlearning"
                )}
                onChange={handleNoteChange}
                value={note}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                maxRows={5}
                fullWidth
                multiline
            />
            <CloseButton onClick={handleClose} isweb={width > MobileWidth?'true':undefined}>
                <ImageComponent
                    src={CrossIcon}
                    alt="close"
                    width={width > MobileWidth?"1.8rem":'1.4rem'}
                    height="auto"
                    filterAllowed
                />
            </CloseButton>
        </NoteBox>
    )
}

export default Notebox