import React, { useContext, useState } from "react";
import { Box, Divider, Grid, IconButton, Typography, styled, useTheme } from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import DownIcon from "assets/icons/chevron-down.png";
import DownIconDark from "assets/icons/chevron-down-dark.png";
import UpIcon from "assets/icons/chevron-up.png";
import UpIconDark from "assets/icons/chevron-up-dark.png";
import DeleteIcon from "assets/icons/trash.png";
import AddSkillIcon from 'assets/icons/message-circle.png'
import AddSkillDisabledIcon from 'assets/icons/message-circle-disabled.png'
import MicroLearningCard from "./cards/MicroLearningCard";
import { TextSizes } from "entities/constants";
import { TextSizeContext } from "data/index";
import { ParagraphInterface, SkillboxCourseInterface } from "entities/interfaces";
import ConfirmationModal from "ui/components/shared/ConfirmationModal";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "1rem",
  width: '18.8125rem',
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.primary.main}`,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'transparent',
  },
  //   [`& .${linearProgressClasses.bar}`]: {
  //     borderRadius: 5,
  //     backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  //   },
}));

const Wrapper = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[800],
  padding: "0 1.5rem",
  height: "7.75rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: '0px 0px 1px 0px rgba(144, 132, 174, 0.10), 0px 2px 2px 0px rgba(144, 132, 174, 0.09), 0px 4px 2px 0px rgba(144, 132, 174, 0.05), 0px 6px 3px 0px rgba(144, 132, 174, 0.01), 0px 10px 3px 0px rgba(144, 132, 174, 0.00)'
}));

const Label = styled(Typography)(() => ({
  fontWeight: 500,
}));

const Progress = styled(Typography)(() => ({
  fontWeight: 400,
  textAlign: "center",
}));

const GridItem = styled(Grid)(() => ({
  display: "flex",
  alignItems: 'center',
  gap: "1.5rem",
}));

const ExpandBox = styled(Box)(({theme}) => ({
  backgroundColor:theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[600],
  display: "flex",
  flexDirection: "column",
  marginBottom: '0.2rem'
}));

const SkillboxRow = ({ skill, addUserCourse, deleteUserCourse, expanded, handleExpand, handleExpandClose, setChapterNote,
  getChapterNote, getChapterHistory, getChapterMaterial }: {
    skill: SkillboxCourseInterface,
    addUserCourse: (courseId: number) => Promise<number>,
    deleteUserCourse: (courseId: number) => Promise<number>
    expanded?: SkillboxCourseInterface
    handleExpand: (skill: SkillboxCourseInterface) => void
    handleExpandClose: () => void
    setChapterNote: (chapterId: number, note: string) => Promise<void>;
    getChapterNote: (chapterId: number) => Promise<string>
    getChapterHistory: (chapterId: number) => Promise<ParagraphInterface[]>
    getChapterMaterial: (chapterId: number) => void
  }) => {
  const { state: textSize } = useContext(TextSizeContext)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const theme = useTheme()

  return (
    <Box>
      <Wrapper container sx={{ borderRadius: expanded === skill ? '8px 8px 0 0' : '2px' }}>
        <GridItem item lg={5} md={4.5}>
          <ImageComponent
            src={skill.thumbnail}
            alt="Logo"
            height="3.75rem"
            width="3.75rem"
            borderRadius="50%"
          />
          <Label fontSize={TextSizes[textSize].title3}>{skill.title}</Label>
        </GridItem>
        <GridItem item lg={6} md={5} sx={{ gap: '0.75rem' }}>
          <BorderLinearProgress variant="determinate" value={skill.progress} />
          <Progress fontSize={TextSizes[textSize].callout}>{skill.progress.toFixed(0)}%</Progress>
        </GridItem>
        <GridItem item lg={1} md={2.5} sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('lg')]: { gap: '0.8rem' } }}>
          <IconButton onClick={() => addUserCourse(skill.id)} disabled={skill.state.toString() === '1'}>
            <ImageComponent
              src={skill.state.toString() === '1' ? AddSkillDisabledIcon : AddSkillIcon}
              alt="add"
              width="1.5rem"
              height="1.5rem"
              filterAllowed
            />
          </IconButton>
          <IconButton onClick={() => setDeleteConfirmationModal(true)}>
            <ImageComponent
              src={DeleteIcon}
              alt="delete"
              width="1.5rem"
              height="1.5rem"
            />
          </IconButton>
          <IconButton onClick={expanded === skill ? handleExpandClose : () => handleExpand(skill)}>
            <ImageComponent
              src={theme.palette.mode === 'light' ? (expanded === skill ? UpIcon : DownIcon) : (expanded === skill ? UpIconDark : DownIconDark)}
              alt={expanded === skill ? "hide" : "expand"}
              width="1.5rem"
              height="1.5rem"
            />
          </IconButton>
        </GridItem >
      </Wrapper>
      {expanded === skill ?
        <>
          <Divider sx={{ height: '2px', backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.grey[900] }} />
          <ExpandBox>
            {
              skill.chapters.map((chapter: any, index: number) => (
                <>
                  <MicroLearningCard key={chapter.title} data={chapter} num={index + 1} saveNote={async (note: string) => await setChapterNote(chapter.id, note)}
                    getNote={async ()=> await getChapterNote(chapter.id)} getChapterHistory={async ()=> await getChapterHistory(chapter.id)} getChapterMateria={async ()=> await getChapterMaterial(chapter.id)} />
                  <Divider />
                </>
              ))
            }
          </ExpandBox>
        </>
        : <Divider />
      }
      {deleteConfirmationModal &&
        <ConfirmationModal closeModal={() => setDeleteConfirmationModal(false)} confirmColor='error'
          handleConfirm={() => deleteUserCourse(skill.id)} title='Removing Course' description={`Are you sure you want to remove  ${skill.title}?`}
        />
      }
    </Box>
  );
};

export default SkillboxRow;
