import React, { useContext, useState } from "react";
import { Box, Grid, IconButton, Typography, alpha, styled, useTheme } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import OpenInNewWindowIcon from "assets/icons/external-link.png";
import NoteboxIcon from "assets/icons/edit.png";
import ToolboxIcon from "assets/icons/book.png";
import BookmarkIcon from "assets/icons/bookmark-filled.png";
import OpenInNewWindowIconDark from "assets/icons/external-link-dark.png";
import NoteboxIconDark from "assets/icons/edit-dark.png";
import ToolboxIconDark from "assets/icons/book-dark.png";
import SkillModal from "../modals/SkillModal";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";
import NoteModal from "../modals/NoteModal";
import ToolModal from "../modals/ToolModal";
import { useTranslation } from "react-i18next";

const Wrapper = styled(Box)<{active?:string}>(({ theme, active }) => ({
  backgroundColor: active? alpha(theme.palette.primary.main, 0.2): theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[600],
  width: '100%',
  height: '4rem',
  padding: '0 6.75rem 0 5rem',
  borderLeft: `4px solid ${active? alpha(theme.palette.primary.main, 0.6):'transparent'}`
}));

const MainGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}));

const Title = styled(Typography)<{active?:string}>(({ theme, active }) => ({
  fontWeight: 400,
  color: active && theme.palette.primary.main 
}));

const Topic = styled(Typography)<{active?:string}>(({ theme, active }) => ({
  fontWeight: 400,
  color: active && theme.palette.primary.main
}));

const GridItem = styled(Grid)(() => ({
  display: "flex",
  alignItems: 'center',
  gap: "1.5rem",
}));

const MicroLearningCard = ({ num, data, saveNote, getNote, getChapterHistory, getChapterMaterial }: any) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { state: textSize } = useContext(TextSizeContext)
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [toolModalOpen, setToolModalOpen] = useState(false);

  return (
    <Wrapper active={data.progress===1?'true':undefined}>
      <MainGrid container>
        <GridItem item lg={5.5} md={5}>
          <Box sx={{ width: '1.5rem', height: '1.5rem' }}>
            {data.bookmark === '1' && <ImageComponent src={BookmarkIcon} alt="bookmark" width="1.5rem" height="1.5rem" />}
          </Box>
          <Title active={data.progress===1?'true':undefined} color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].callout}>{t('Microlearning')} {num}</Title>
        </GridItem>
        <GridItem item lg={5.5} md={5} >
          <Topic active={data.progress===1?'true':undefined} color={data.isExpandable && "primary"} fontSize={TextSizes[textSize].callout}>{data.title}</Topic>
        </GridItem>
        <GridItem item lg={1} md={2} sx={{ justifyContent: 'flex-start' }}>
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
        </GridItem>
      </MainGrid>
      {skillModalOpen && <SkillModal closeModal={() => setSkillModalOpen(false)} getChapterHistory={getChapterHistory} />}
      {noteModalOpen && <NoteModal closeModal={() => setNoteModalOpen(false)} saveNote={saveNote} getNote={getNote} />}
      {toolModalOpen && <ToolModal closeModal={() => setToolModalOpen(false)} getChapterMaterial={getChapterMaterial} />}
    </Wrapper>
  );
};

export default MicroLearningCard;
