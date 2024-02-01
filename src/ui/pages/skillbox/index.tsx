import React from "react";
import { Box, styled } from "@mui/material";
import SkillboxRow from "ui/components/pages/skillbox/SkillboxRow";
import Header from "ui/components/shared/Header";
import SkillynxStiker from "assets/logos/Skillynx_Sticker.png";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import SkillboxListView from "ui/components/mobile/skillbox/SkillboxListView";

const SkillboxWrapper = styled(Box)(({ theme }) => ({
  padding: "0.4rem 2rem",
  height: "100%",
  width: `100%`,
  display: "flex",
  flexDirection: "column",
  background: theme.palette.common.white,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.4rem",
    height: '0.4rem',
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.secondary.main,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[700],
  },
}));

const Skillbox = () => {
  const { width } = useScreenSize()

  const Skills = [
    {
      label: "Eating Healthy",
      image: SkillynxStiker,
      progress: 40,
      addDisabled: true,
      chapters: [
        {
          title: "Microlearning 1",
          topic: "Topic 1",
          isImportant: true,
          isExpandable: true,
        },
        {
          title: "Microlearning 2",
          topic: "Topic 2",
          isImportant: false,
          isExpandable: true,
        },
        {
          title: "Microlearning 3",
          topic: "Topic 3",
          isImportant: false,
          isExpandable: false,
        },
        {
          title: "Microlearning 4",
          topic: "Topic 4",
          isImportant: false,
          isExpandable: false,
        },
        {
          title: "Microlearning 5",
          topic: "Topic 5",
          isImportant: false,
          isExpandable: false,
        },
      ],
    },
    {
      label: "Negotiation",
      image: SkillynxStiker,
      progress: 40,
      addDisabled: true,
      chapters: [],
    },
    {
      label: "Time Management",
      image: SkillynxStiker,
      progress: 0,
      addDisabled: true,
      chapters: [],
    },
    {
      label: "Team Leadership",
      image: SkillynxStiker,
      progress: 0,
      addDisabled: true,
      chapters: [],
    },
    {
      label: "Collaboration",
      image: SkillynxStiker,
      progress: 0,
      addDisabled: false,
      chapters: [],
    },
  ];

  return (
    <>
      {width > MobileWidth ? (
        <>
          <Header />
          <SkillboxWrapper>
            {Skills.map((skill) => (
              <SkillboxRow key={skill.label} skill={skill} />
            ))}
          </SkillboxWrapper>
        </>
      ) : (
        <SkillboxListView skills={Skills}/>
      )}
    </>
  )
};

export default Skillbox;
