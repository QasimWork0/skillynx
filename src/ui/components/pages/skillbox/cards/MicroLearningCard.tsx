import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import Button, { buttonClasses } from "@mui/material/Button";
import ImageComponent from "ui/components/shared/ImageComponent";
import DownIcon from "assets/icons/Arrow_Down.png";
import UpIcon from "assets/icons/Arrow_Up.png";
import OpenInNewWindowIcon from "assets/icons/Expand.png";
import NoteboxIcon from "assets/icons/Write.png";
import ToolboxIcon from "assets/icons/Tool.png";
import StarIcon from "assets/icons/Star.png";
import SkillModal from "../modals/SkillModal";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";
import Notebox from "./Notebox";
import Toolbox from "./Toolbox";

const Wrapper = styled(Box)(() => ({
  padding: "0 3rem",
}));

const MainGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  height: "5rem",
}));

const ExpandBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "2rem",
}));

const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
}));

const Title = styled(Typography)(() => ({
  fontWeight: "bolder",
  flex: 1,
}));

const Topic = styled(Typography)(() => ({
  fontWeight: "bolder",
  flex: 1,
  textAlign: "center",
}));

const TopicBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "2rem",
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "0px",
  width: "2.6rem",
  height: "2.6rem",
  [`&.${buttonClasses.containedSecondary}`]: {
    backgroundColor: theme.palette.common.white,
    ":hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const MicroLearningCard = ({ data }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const [isExpanded, setIsExpanded] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [noteboxOpen, setNoteboxOpen] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSkillModal = (flag: boolean) => {
    setSkillModalOpen(flag);
  };

  const handleNotePad = (flag: boolean) => {
    setNoteboxOpen(flag);
  }

  const handleToolPad = (flag: boolean) => {
    setToolboxOpen(flag);
  };

  return (
    <Wrapper>
      <MainGrid container>
        <Grid item md={4.5}>
          <Title color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].body}>{data.title}</Title>
        </Grid>
        <Grid item md={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TopicBox>
            <Topic color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].body}>{data.topic}</Topic>
            <Box sx={{ width: "2rem" }}>
              {data.isImportant && (
                <ImageComponent
                  src={StarIcon}
                  alt="important"
                  width="2rem"
                  height="auto"
                />
              )}
            </Box>
          </TopicBox>
        </Grid>
        <Grid
          item
          md={4.5}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {data.isExpandable && (
            <IconButton onClick={handleExpand}>
              <ImageComponent
                src={isExpanded ? UpIcon : DownIcon}
                alt={isExpanded ? "hide" : "expand"}
                width="2.5rem"
                height="2.5rem"
                filterAllowed
              />
            </IconButton>
          )}
        </Grid>
      </MainGrid>
      {isExpanded && (
        <ExpandBox>
          <ButtonsBox>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={() => handleSkillModal(true)}
            >
              <ImageComponent
                src={OpenInNewWindowIcon}
                alt="detail"
                width="2rem"
                height="auto"
                filterAllowed
              />
            </StyledButton>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={() => handleNotePad(true)}
            >
              <ImageComponent
                src={NoteboxIcon}
                alt="notepad"
                width="2rem"
                height="auto"
                filterAllowed
              />
            </StyledButton>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={() => handleToolPad(true)}
            >
              <ImageComponent
                src={ToolboxIcon}
                alt="toolbox"
                width="2rem"
                height="auto"
                filterAllowed
              />
            </StyledButton>
          </ButtonsBox>
          {noteboxOpen && (
            <Notebox handleClose={() => handleNotePad(false)}/>
          )}
          {toolboxOpen && (
            <Toolbox handleClose={() => handleToolPad(false)}/>
          )}
        </ExpandBox>
      )}
      {skillModalOpen && (
        <SkillModal closeModal={() => handleSkillModal(false)} />
      )}
    </Wrapper>
  );
};

export default MicroLearningCard;
