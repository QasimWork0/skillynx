import { Button, styled } from '@mui/material';
import { TextSizeContext } from 'data/index';
import { TextSizes } from 'entities/constants';
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "2rem",
  fontWeight: 500,
  textTransform: "none",
  color: theme.palette.common.white,
  gap:'0.4rem'
}));


export const SubmitButton = ({ color, onClick, children, disabled=false, variant = "contained", fontColor = '', width = '11rem', marginTop = '1.6rem', height = 'auto', margin='', icon=<></> }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const { t } = useTranslation();

  return (
    <StyledButton onClick={onClick} color={color} variant={variant} disabled={disabled}
      sx={{
        fontSize: TextSizes[textSize].body,
        color: fontColor && fontColor,
        width: width,
        height: height,
        margin: margin,
        marginTop: marginTop,
      }}>
      {icon}
      {t(children)}
    </StyledButton>
  )
}
