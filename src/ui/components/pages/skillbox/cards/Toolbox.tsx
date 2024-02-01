import { Box, IconButton, styled } from '@mui/material';
import React from 'react'
import ImageComponent from 'ui/components/shared/ImageComponent'
import CrossIcon from "assets/icons/Cancel.png";
import useScreenSize from 'hooks/ScreenSize';
import { MobileWidth } from 'entities/constants';

const CloseButton = styled(IconButton)<{ isweb?: string }>(({ theme, isweb }) => ({
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

const ToolBox = styled(Box)(({ theme }) => ({
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

const Toolbox = ({ handleClose }: any) => {
  const { width } = useScreenSize()
  return (
    <ToolBox>
      <CloseButton onClick={handleClose} isweb={width > MobileWidth ? 'true' : undefined}>
        <ImageComponent
          src={CrossIcon}
          alt="close"
          width={width > MobileWidth ? "1.8rem" : '1.4rem'}
          height="auto"
          filterAllowed
        />
      </CloseButton>
    </ToolBox>
  )
}

export default Toolbox