import React, { useContext, useState } from "react";
import { Typography, TextField, styled, IconButton, InputAdornment, Box, useTheme } from "@mui/material";
import EyeIcon from 'assets/icons/eye.png'
import EyeOffIcon from 'assets/icons/eye-off.png'
import EyeIconDark from 'assets/icons/eye-dark.png'
import EyeOffIconDark from 'assets/icons/eye-off-dark.png'
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";
import ImageComponent from "./ImageComponent";
import { useTranslation } from "react-i18next";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: 'column',
  width: '27.5625rem',
  maxWidth:'100%',
  height: '6.4rem',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.2rem'
}));

const TextInput = styled(TextField)(
  ({ theme }) => ({
    borderRadius: "0.5rem",
    '.MuiOutlinedInput-input': {
      height: '3rem',
      padding: '0 1rem'
    }
  })
)

const TextBox = ({
  label,
  value,
  onChange,
  error = '',
  type = "text",
  isRequired = false
}: any) => {
  const theme = useTheme()
  const { state: textSize } = useContext(TextSizeContext);
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
      <LabelWrapper>
        <Label fontSize={TextSizes[textSize].body}>{t(label)}</Label>
        {isRequired && <Typography color='error'>*</Typography>}
      </LabelWrapper>
      <TextInput
        error={error}
        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
        onChange={onChange}
        value={value}
        InputProps={{
          sx: { fontSize: TextSizes[textSize].body },
          endAdornment: (
            type === 'password' &&
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ?
                  <ImageComponent src={theme.palette.mode==='light'? EyeOffIcon: EyeOffIconDark} alt="hide" width="1.25rem" height="1.25rem"/>
                  :
                  <ImageComponent src={theme.palette.mode==='light'? EyeIcon: EyeIconDark} alt="show" width="1.25rem" height="1.25rem"/>
                }
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Typography color='error' fontSize={TextSizes[textSize].footnote}>{t(error)} </Typography>
    </Wrapper>
  );
};

export default TextBox;
