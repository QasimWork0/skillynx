import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { MobileWidth } from "entities/constants";
import useScreenSize from "hooks/ScreenSize";
import SkillsDesktop from "./SkillsDesktop";
import SkillsListView from "ui/components/mobile/skills/SkillsListView";
import { DrawerPropType, SkillsPropType } from "entities/interfaces";
import Header from "ui/components/shared/Header";
import WithSkillsData from "ui/containers/skills";

const SkillsWrapper = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  display: "flex",
}));

const Skills = ({ courses, deleteUserCourse, updateProgress}: SkillsPropType) => {
  const { width } = useScreenSize()
  const [active, setActive] = useState<DrawerPropType>({
    title: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (width > MobileWidth) {
      setActive(courses.length > 0 ? courses[0] : {
        title: "",
        thumbnail: "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  return (
    <SkillsWrapper sx={{ flexDirection: 'column' }}>
      {width > MobileWidth ? (
        <>
          <Header data={active} />
          <SkillsDesktop options={courses} active={active} setActive={setActive} deleteUserCourse={deleteUserCourse} updateProgress={updateProgress}/>
        </>
      ) : (
        <SkillsListView options={courses} active={active} setActive={setActive} deleteUserCourse={deleteUserCourse} updateProgress={updateProgress}/>
      )}
    </SkillsWrapper>
  );
};

export default WithSkillsData(Skills);
