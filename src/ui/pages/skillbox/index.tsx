import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import SkillboxRow from "ui/components/pages/skillbox/SkillboxRow";
import Header from "ui/components/shared/Header";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import SkillboxListView from "ui/components/mobile/skillbox/SkillboxListView";
import WithSkillboxData from "ui/containers/skillbox";
import { SkillboxCourseInterface, SkillboxPropType } from "entities/interfaces";

const SkillboxWrapper = styled(Box)(({ theme }) => ({
  margin: "0.1rem",
  padding: '1.9rem',
  height: "100%",
  // width: `100%`,
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.4rem",
    height: '0.4rem',
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.secondary.main,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.dark,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[700],
  },
}));

const Skillbox = ({ courses, addUserCourse, deleteUserCourse, setChapterNote: setCourseNote, getChapterNote, getChapterHistory, getChapterMaterial }: SkillboxPropType) => {
  const { width } = useScreenSize()
  const [expandedSkill, setExpandedSkill] = useState<SkillboxCourseInterface>();

  const handleExpand = (skill: SkillboxCourseInterface) => {
    setExpandedSkill(skill)
  }

  const handleExpandClose = () => {
    setExpandedSkill(undefined)
  }

  return (
    <>
      {width > MobileWidth ? (
        <>
          <Header />
          <SkillboxWrapper>
            {courses.map((skill) => (
              <SkillboxRow key={skill.id} skill={skill} addUserCourse={addUserCourse} deleteUserCourse={deleteUserCourse}
                expanded={expandedSkill} handleExpand={handleExpand} handleExpandClose={handleExpandClose} setChapterNote={setCourseNote}
                getChapterNote={getChapterNote} getChapterHistory={getChapterHistory} getChapterMaterial={getChapterMaterial} />
            ))}
          </SkillboxWrapper>
        </>
      ) : (
        <SkillboxListView skills={courses} addUserCourse={addUserCourse} deleteUserCourse={deleteUserCourse}
          expanded={expandedSkill} handleExpand={handleExpand} handleExpandClose={handleExpandClose} setChapterNote={setCourseNote}
          getChapterNote={getChapterNote} getChapterHistory={getChapterHistory} getChapterMaterial={getChapterMaterial} />
      )}
    </>
  )
};

export default WithSkillboxData(Skillbox);
