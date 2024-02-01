import React, { useContext } from "react";
import { Box, Button, Divider, IconButton, Typography, styled } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import CrossIcon from "assets/icons/Cancel.png";
import AddMessageIcon from "assets/icons/Add_Chat.png";
import AddMessageDisabledIcon from "assets/icons/Add_Chat _Disabled.png";
import { TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "0.7rem",
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.primary.main}`,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.common.white,
  },
}));

const Wrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const ExpandButton = styled(Button)(() => ({
  padding: "1rem 0.8rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  columnGap: '1rem',
  borderRadius: "0 1rem 1rem 0",
  textTransform: 'none'
}));

const ProgressBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.4rem",
  width: '100%',
  maxWidth: '16rem'
}))

const Label = styled(Typography)(() => ({
  fontWeight: "bolder",
  width: '100%',
  textAlign: 'left',
}));

const Progress = styled(Typography)(() => ({
  fontWeight: "bolder",
  textAlign: "center",
  width: "100%",
}));

const SkillboxRowMobile = ({ skill, handleClick }: any) => {
  const { state: textSize } = useContext(TextSizeContext)

  return (
    <>
      <Wrapper>
        <ExpandButton onClick={handleClick}>
          <ImageComponent
            src={skill.image}
            alt="Logo"
            height="5rem"
            width="auto"
          />
          <ProgressBox>
            <Label fontSize={TextSizes[textSize].title3}>{skill.label}</Label>
            <BorderLinearProgress variant="determinate" value={skill.progress} />
            <Progress fontSize={TextSizes[textSize].title3}>{skill.progress}%</Progress>
          </ProgressBox>
        </ExpandButton>

        <IconButton disabled={skill.addDisabled}>
          <ImageComponent
            src={skill.addDisabled ? AddMessageDisabledIcon : AddMessageIcon}
            alt="add skill"
            width="2.2rem"
            height="2.2rem"
            filterAllowed
            filter={skill.addDisabled ? 'invert(70%)' : 'invert(100%)'}
          />
        </IconButton>
        {/* <IconButton>
          <ImageComponent
            src={CrossIcon}
            alt="delete"
            width="2.5rem"
            height="2.5rem"
            filterAllowed
          />
        </IconButton> */}
      </Wrapper>
      <Divider />
    </>
  );
};

export default SkillboxRowMobile;
