import React, { useContext } from "react";
import { Box, Divider, Typography, styled } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { MobileWidth, TextSizes } from "entities/constants";
import PdfImage from "assets/images/pdf.png"
import DocxImage from "assets/images/docx.png"
import CustomModal from "ui/components/shared/CustomModal";
import useScreenSize from "hooks/ScreenSize";

const ContentBox = styled(Box)(({ theme }) => ({
    height: '21.75rem',
    display: "flex",
    flexDirection: 'column',
    gap: '2px',
    margin: '0 1.5rem 1.5rem 1.5rem',
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
        "&::-webkit-scrollbar": {
            width: "0.4rem",
            height: '0.4rem',
        },
        "&::-webkit-scrollbar-track": {
            background: theme.palette.secondary.main,
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.dark,
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.grey[700],
        },
    }
}));

const FileBox = styled(Box)(({ theme }) => ({
    height: '6.25rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem 0.5rem',
    gap: '1rem',
}));

const ToolModal = ({ closeModal }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)
    const { width } = useScreenSize()

    const files = [
        {
            name: 'Worksheet 1',
            type: 'pdf'
        },
        {
            name: 'Worksheet 2',
            type: 'pdf'
        },
        {
            name: 'Worksheet 3',
            type: 'docs'
        },
        {
            name: 'Worksheet 4',
            type: 'docs'
        },
    ]

    return (
        <CustomModal closeModal={closeModal} width={width > MobileWidth ? '32rem' : '23.75rem'} height='26.75rem' title='Course Material'>
            <ContentBox>
                {files.map((item: any, index: number) => (
                    <>
                        <FileBox key={index}>
                            <ImageComponent src={item.type === 'pdf' ? PdfImage : DocxImage} alt="file" width='auto' height="3.25rem" />
                            <Typography paddingLeft={item.type === 'pdf' ? '0.5rem' : '0'} fontSize={TextSizes[textSize].callout}>{t(item.name)}</Typography>
                        </FileBox>
                        <Divider variant="middle" />
                    </>
                ))}
            </ContentBox>
        </CustomModal>

    );
};

export default ToolModal;
