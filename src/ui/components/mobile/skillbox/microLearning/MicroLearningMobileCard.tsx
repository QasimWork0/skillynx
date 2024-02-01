import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import Button, { } from "@mui/material/Button";
import ImageComponent from "ui/components/shared/ImageComponent";
import NoteboxIcon from "assets/icons/Write.png";
import ToolboxIcon from "assets/icons/Tool.png";
import StarIcon from "assets/icons/Star.png";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";
import Notebox from "ui/components/pages/skillbox/cards/Notebox";
import Toolbox from "ui/components/pages/skillbox/cards/Toolbox";

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.secondary.main,
}));

const MainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
}));

const OpenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: 'column',
  alignItems: "flex-start",
  height: "calc(100% - 2px)",
  textTransform: 'none',
  width: '100%',
  borderRadius: '0 0 1rem 0',
  padding: '0 1.4rem'
}));

const TitleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: 'center',
  gap: '2rem',
}));

const Title = styled(Typography)(() => ({
  fontWeight: "bolder",
  flex: 1,
}));

const ExpandBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.6rem",
  padding: '0.6rem'
}));

const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'space-evenly'
}));



const Topic = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: "bolder",
  textAlign: "left",
  width: '100%'
}));

const MicroLearningMobileCard = ({ data, handleClick }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  const [noteboxOpen, setNoteboxOpen] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const handleNotePad = (flag: boolean) => {
    setNoteboxOpen(flag);
  }

  const handleToolPad = (flag: boolean) => {
    setToolboxOpen(flag);
  };

  return (
    <Wrapper>
      <MainBox>
        <OpenButton onClick={handleClick}>
          <TitleBox>
            <Title color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].body}>{data.title}</Title>
            {data.isImportant && (
              <ImageComponent
                src={StarIcon}
                alt="important"
                width="2rem"
                height="auto"
              />
            )}
          </TitleBox>
          <Topic color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].callout}>{data.topic}</Topic>
        </OpenButton>
        <ButtonsBox>
          <IconButton
            onClick={() => handleNotePad(true)}
          >
            <ImageComponent
              src={NoteboxIcon}
              alt="notepad"
              width="2rem"
              height="auto"
              filterAllowed
            />
          </IconButton>
          <IconButton
            onClick={() => handleToolPad(true)}
          >
            <ImageComponent
              src={ToolboxIcon}
              alt="toolbox"
              width="2rem"
              height="auto"
              filterAllowed
            />
          </IconButton>
        </ButtonsBox>
      </MainBox>
      {(noteboxOpen||toolboxOpen) && (
        <ExpandBox>
          {noteboxOpen && (
            <Notebox handleClose={() => handleNotePad(false)} />
          )}
          {toolboxOpen && (
            <Toolbox handleClose={() => handleToolPad(false)} />
          )}
        </ExpandBox>
      )}
    </Wrapper>
  );
};

export default MicroLearningMobileCard;
