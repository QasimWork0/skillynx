import React, { useContext, useState } from "react";
import { Box, IconButton, Typography, alpha, styled, useTheme, } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";
import { useTranslation } from "react-i18next";
import BookmarkIcon from "assets/icons/bookmark-filled.png";
import OpenInNewWindowIcon from "assets/icons/external-link.png";
import NoteboxIcon from "assets/icons/edit.png";
import ToolboxIcon from "assets/icons/book.png";
import OpenInNewWindowIconDark from "assets/icons/external-link-dark.png";
import NoteboxIconDark from "assets/icons/edit-dark.png";
import ToolboxIconDark from "assets/icons/book-dark.png";
import SkillModal from "ui/components/pages/skillbox/modals/SkillModal";
import NoteModal from "ui/components/pages/skillbox/modals/NoteModal";
import ToolModal from "ui/components/pages/skillbox/modals/ToolModal";

const Wrapper = styled(Box)<{active?:string}>(({ theme, active }) => ({
  display: 'flex',
  height: '7.25rem',
  padding: '0.25rem 0.75rem 0.25rem 1.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  backgroundColor: active&& alpha(theme.palette.primary.main, 0.2),
  borderLeft: `4px solid ${active? alpha(theme.palette.primary.main, 0.6):'transparent'}`,
}));

const TitleBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: 'column',
  gap: '0.25rem',
}));

const MicrolearningBox = styled(Box)(() => ({
  display: "flex",
  gap: '0.25rem',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.text.secondary
}));

const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: 'center',
  gap: '0.5rem'
}));

const Topic = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const MicroLearningMobileCard = ({ data, num, saveNote, getNote, getChapterHistory, getChapterMaterial }: any) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [toolModalOpen, setToolModalOpen] = useState(false);

  return (
    <Wrapper active={data.progress===1?'true':undefined}>
      <TitleBox>
        <MicrolearningBox>
          {data.isBookmarked && <ImageComponent src={BookmarkIcon} alt="important" width="1.5rem" height="1.5rem" />}
          <Topic color="primary" fontSize={TextSizes[textSize].callout}>{t('Microlearning')} {num}</Topic>
        </MicrolearningBox>
        <Title color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].subhead}>{data.title}</Title>
      </TitleBox>
      <ButtonsBox>
        <IconButton onClick={() => setSkillModalOpen(true)}>
          <ImageComponent
            src={theme.palette.mode === 'light' ? OpenInNewWindowIcon : OpenInNewWindowIconDark}
            alt="detail"
            width="1.5rem"
            height="1.5rem"
          />
        </IconButton>
        <IconButton onClick={() => setNoteModalOpen(true)}>
          <ImageComponent
            src={theme.palette.mode === 'light' ? NoteboxIcon : NoteboxIconDark}
            alt="notepad"
            width="1.5rem"
            height="1.5rem"
          />
        </IconButton>
        <IconButton onClick={() => setToolModalOpen(true)}>
          <ImageComponent
            src={theme.palette.mode === 'light' ? ToolboxIcon : ToolboxIconDark}
            alt="toolbox"
            width="1.5rem"
            height="1.5rem"
          />
        </IconButton>
      </ButtonsBox>
      {skillModalOpen && <SkillModal closeModal={() => setSkillModalOpen(false)} getChapterHistory={getChapterHistory} />}
      {noteModalOpen && <NoteModal closeModal={() => setNoteModalOpen(false)} saveNote={saveNote} getNote={getNote} />}
      {toolModalOpen && <ToolModal closeModal={() => setToolModalOpen(false)} getChapterMaterial={getChapterMaterial} />}
    </Wrapper>
  );
};

export default MicroLearningMobileCard;
