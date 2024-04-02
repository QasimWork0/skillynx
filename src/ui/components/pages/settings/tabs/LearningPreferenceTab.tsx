import React, { useContext, useState } from "react";
import { Box, Button, styled, useTheme } from "@mui/material";
import { DarkModes, TextModes } from "entities/constants";
import RadioButtons from "ui/components/shared/RadioButtons";
import TitleBox from "ui/components/shared/TitleBox";
import { BackgroundContext, DarkModeContext, TextSizeContext } from "data/index";
import ImageComponent from "ui/components/shared/ImageComponent";
import BackgroundImage2 from "assets/images/Background_Chat.png";
import BackgroundImage1 from "assets/images/Background.png";

const WrapperBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "1.4rem 0.8rem",
}));

const BackgroundBox = styled(Box)(() => ({
  display: "flex",
  gap: '1rem'
}));

const BackgroundButton = styled(Button)<{border:string, backgroundColor?:string}>(({theme, border, backgroundColor}) => ({
  width:"5.375rem",
  height: "5.375rem",
  padding: 0,
  borderRadius: "0.5rem",
  border: border,
  boxShadow: '0px 2px 4px 0px rgba(121, 121, 121, 0.25)',
  backgroundColor: backgroundColor? backgroundColor : theme.palette.common.white,
  overflow: 'hidden'
}));

const BackgroundComponent = () => {
  const { state: backgroundImage, updateContext: setBackgroundImage } = useContext(BackgroundContext)
  const theme = useTheme()

  const getBorder = (num: number) => (
    backgroundImage === num ? `0.125rem solid ${theme.palette.primary.main}` : ''
  )

  return (
    <BackgroundBox>
      <BackgroundButton border={getBorder(1)} onClick={()=>{setBackgroundImage(1)}} color="primary">
        <ImageComponent src={BackgroundImage1} alt='bachground1' width="100%" height="100%" borderRadius="0.5rem" transform="scale(4)"/>
      </BackgroundButton>
      <BackgroundButton border={getBorder(2)} onClick={()=>{setBackgroundImage(2)}} color="primary">
        <ImageComponent src={BackgroundImage2} alt='bachground2' width="100%" height="100%" borderRadius="0.5rem" transform="scale(4)"/>
      </BackgroundButton>
      <BackgroundButton border={getBorder(3)} onClick={()=>{setBackgroundImage(3)}} backgroundColor={theme.palette.secondary.main} color="primary"/>
      <BackgroundButton border={getBorder(4)} onClick={()=>{setBackgroundImage(4)}} color="primary"/>
    </BackgroundBox>
  )
}


const LearningPreferenceTab = () => {
  const { state: darkTheme, updateContext: setDarktheme } = useContext(DarkModeContext);
  const { state: textSize, updateContext: setTextSize } = useContext(TextSizeContext);

  const [textMode, setTextMode] = useState(1);
  const [darkMode, setDarkMode] = useState(darkTheme ? 0 : 1);

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
    var value = event.target.value === '0' ? true : false
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
          options={['Small', 'Medium', 'Large']}
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
      <TitleBox title="Background">
        <BackgroundComponent />
      </TitleBox>
    </WrapperBox>
  );
};

export default LearningPreferenceTab;
