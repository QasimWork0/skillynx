import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import SkillynxStiker from "assets/logos/Skillynx_Sticker.png";
import { MobileWidth } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";
import SkillsDesktop from "./SkillsDesktop";
import SkillsListView from "ui/components/mobile/skills/SkillsListView";

const SkillsWrapper = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  display: "flex",
}));

const Skills = () => {
  const { width } = useScreenSize()
  const [active, setActive] = useState<{ label: string; image: string }>({
    label: "",
    image: "",
  });

  const Options = [
    {
      label: "Eating Healthy",
      image: SkillynxStiker,
    },
    {
      label: "Negotiation",
      image: SkillynxStiker,
    },
    {
      label: "Time Management",
      image: SkillynxStiker,
    },
    {
      label: "Team Leadership",
      image: SkillynxStiker,
    },
    {
      label: "Collaboration",
      image: SkillynxStiker,
    },
  ];

  return (
    <SkillsWrapper sx={{ flexDirection: width > MobileWidth ? 'row' : 'column' }}>
      {width > MobileWidth ? (
        <SkillsDesktop options={Options} active={active} setActive={setActive} />
      ) : (
        <SkillsListView options={Options} active={active} setActive={setActive} />
      )}
    </SkillsWrapper>
  );
};

export default Skills;
