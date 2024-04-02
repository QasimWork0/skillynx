import React, { useContext, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Grid, Typography, styled } from "@mui/material";
import ImageComponent from "./ImageComponent";
import UserIcon from "assets/icons/Face_Recognition.png";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const ImageInput = styled(MuiFileInput)(({ theme }) => ({
  display: "flex",
  backgroundColor: "transparent",
  borderRadius: "0.5rem",
  width: "5rem",
  height: "5rem",
  justifyContent: "stretch",
  alignItems: "stretch",
  position: "absolute",
  ".MuiIconButton-root": {
    display: "none",
  },
  span: {
    display: "none",
    fontSize: 0,
  },
  input: {
    width: "4.5rem",
    height: "4.5rem",
    // padding: "2rem",
    margin: '-1rem 0 0 0',
    cursor: 'pointer',
  },
}));

const GridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: "bolder",
  color: theme.palette.common.black,
}));

const FileInput = ({ value, onChange, fileType = ".png,.jpg" }: any) => {
  const { t } = useTranslation();
  const { state: textSize } = useContext(TextSizeContext);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  return (
    <Grid container>
      <GridItem item md={3} sx={{ display: "flex", justifyContent: "center" }}>
        <ImageComponent
          src={value ? value : UserIcon}
          alt="profile"
          width="5rem"
          height="5rem"
        />
        <ImageInput
          value={file}
          onChange={handleFileChange}
          inputProps={{ accept: fileType }}
          multiple={false}
          color="primary"
          variant="standard"
          InputProps={{ disableUnderline: true }}
        />
      </GridItem>
      <GridItem item md={9}>
        <Label fontSize={TextSizes[textSize].title3}>{t('Upload image')}!</Label>
      </GridItem>
    </Grid>
  );
};

export default FileInput;
