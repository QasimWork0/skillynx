import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "1.03125rem",
  flexGrow: 1,
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
  gap: '1rem'
}));

const VerticalBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.31rem",
  width: '100%',
  maxWidth: '22rem',
}))

const HorizontalBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: 'center',
  gap: "0.75rem",
  width: '100%',
}))


const Label = styled(Typography)(() => ({
  fontWeight: "bolder",
  width: '100%',
  textAlign: 'left',
}));

const Progress = styled(Typography)(() => ({
  fontWeight: 400,
  width:'2rem'
}));

const SkillboxRowMobile = ({ label, image, progress, selected, date }: any) => {
  const { state: textSize } = useContext(TextSizeContext)

  return (
    <Wrapper>
      <ImageComponent src={image} alt="Logo" height="3.75rem" width="3.75rem" borderRadius="50%" />
      <VerticalBox>
        <Label fontSize={selected ? TextSizes[textSize].body : TextSizes[textSize].callout}
          fontWeight={selected ? 700 : 500}> {label} </Label>
        <HorizontalBox>
          <BorderLinearProgress variant="determinate" value={progress} />
          <Progress fontSize={TextSizes[textSize].callout}>{progress.toFixed(0)}%</Progress>
        </HorizontalBox>
      </VerticalBox>
    </Wrapper>
  );
};

export default SkillboxRowMobile;
