import React, { useContext, useState } from "react";
import { Box, Divider, IconButton, Typography, styled } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import DownIcon from "assets/icons/Arrow_Down.png";
import UpIcon from "assets/icons/Arrow_Up.png";
import CrossIcon from "assets/icons/Cancel.png";
import AddMessageIcon from "assets/icons/Add_Chat.png";
import AddMessageDisabledIcon from "assets/icons/Add_Chat _Disabled.png";
import MicroLearningCard from "./cards/MicroLearningCard";
import { TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "1.1rem",
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.primary.main}`,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.common.white,
  },
  //   [`& .${linearProgressClasses.bar}`]: {
  //     borderRadius: 5,
  //     backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  //   },
}));

const Wrapper = styled(Box)(() => ({
  padding: "0.4rem 2rem",
  height: "10rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Label = styled(Typography)(() => ({
  fontWeight: "bolder",
}));

const Progress = styled(Typography)(() => ({
  fontWeight: "bolder",
  textAlign: "center",
  width: "100%",
}));

const LabelBox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  gap: "1.4rem",
  alignItems: "center",
}));

const ProgressBox = styled(Box)(() => ({
  width: '16rem',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.6rem",
}));

const ButtonsBox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "right",
}));

const ExpandBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  margin: "0 7rem",
}));

const SkillboxRow = ({ skill }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box>
      <Wrapper>
        <LabelBox>
          <ImageComponent
            src={skill.image}
            alt="Logo"
            height="5rem"
            width="auto"
          />
          <Label fontSize={TextSizes[textSize].title3}>{skill.label}</Label>
        </LabelBox>
        <ProgressBox>
          <BorderLinearProgress variant="determinate" value={skill.progress} />
          <Progress fontSize={TextSizes[textSize].title3}>{skill.progress}%</Progress>
        </ProgressBox>
        <ButtonsBox>
          <IconButton onClick={handleExpand}>
            <ImageComponent
              src={isExpanded ? UpIcon : DownIcon}
              alt={isExpanded ? "hide" : "expand"}
              width="2.5rem"
              height="2.5rem"
              filterAllowed
            />
          </IconButton>
          <IconButton disabled={skill.addDisabled}>
            <ImageComponent
              src={skill.addDisabled ? AddMessageDisabledIcon : AddMessageIcon}
              alt="add skill"
              width="2.5rem"
              height="2.5rem"
              filterAllowed
              filter = {skill.addDisabled ? 'invert(70%)': 'invert(100%)'}
            />
          </IconButton>
          <IconButton>
            <ImageComponent
              src={CrossIcon}
              alt="delete"
              width="2.5rem"
              height="2.5rem"
              filterAllowed
            />
          </IconButton>
        </ButtonsBox>
      </Wrapper>
      <ExpandBox>
        <Divider variant="middle" />
        {isExpanded &&
          skill.chapters.map((chapter: any) => (
            <>
              <MicroLearningCard key={chapter.title} data={chapter} />
              <Divider variant="middle" />
            </>
          ))}
      </ExpandBox>
    </Box>
  );
};

export default SkillboxRow;
