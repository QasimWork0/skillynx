import React, { useContext, useState } from "react";
import { Box, styled } from "@mui/material";
import { DarkModes, TextModes, TextSizes } from "entities/constants";
import RadioButtons from "ui/components/shared/RadioButtons";
import TitleBox from "ui/components/shared/TitleBox";
import { DarkModeContext, TextSizeContext } from "data/index";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "50%",
  height: "100%",
  padding: "1.4rem 0.8rem",
  gap: "2rem",
}));

const LearningPreferenceTab = () => {
  const { state: darkTheme, updateContext: setDarktheme } = useContext(DarkModeContext);
  const { state: textSize, updateContext: setTextSize } = useContext(TextSizeContext);

  const [textMode, setTextMode] = useState(TextModes[1]);
  const [darkMode, setDarkMode] = useState(darkTheme?DarkModes[0]:DarkModes[1]);

  const handleTextModeChange = (event: any) => {
    setTextMode(event.target.value);
  };

  const handleTextSizeChange = (event: any) => {
    var value = event.target.value
    setTextSize(value);
    localStorage.setItem('textSize', value.toString())
  };

  const handleDarkModeChange = (event: any) => {
    setDarkMode(event.target.value)
    var value = event.target.value===DarkModes[0] ? true : false
    setDarktheme(value)
    localStorage.setItem('darkMode', value.toString())
  };

  return (
    <WrapperBox>
      <TitleBox title="Text Mode">
        <RadioButtons
          options={TextModes}
          onChange={handleTextModeChange}
          value={textMode}
        />
      </TitleBox>
      <TitleBox title="Text Size">
        <RadioButtons
          options={Object.keys(TextSizes)}
          onChange={handleTextSizeChange}
          value={textSize}
        />
      </TitleBox>
      <TitleBox title="Dark Mode">
        <RadioButtons
          options={DarkModes}
          onChange={handleDarkModeChange}
          value={darkMode}
        />
      </TitleBox>
    </WrapperBox>
  );
};

export default LearningPreferenceTab;
