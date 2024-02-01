import { useContext, useEffect, useLayoutEffect } from "react";
import { darkThemeOptions, lightThemeOptions } from "./entities/themeOptions";
import MainRoutes from "./routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DarkModeContext, DarkModeContextProvider, TextSizeContext, TextSizeContextProvider } from "data/index";
import { useTranslation } from "react-i18next";
import { AppWidthMin } from "entities/constants";

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

const SkillynxApp = () => {
  const { i18n } = useTranslation();
  const { state: darkMode, updateContext: setDarkMode } = useContext(DarkModeContext);
  const { updateContext: setTextSize } = useContext(TextSizeContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < AppWidthMin) {
        window.resizeTo(AppWidthMin, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useLayoutEffect(() => {
    localStorage.getItem("darkMode") === "true" ? setDarkMode(true) : setDarkMode(false)
    localStorage.getItem("textSize") !== null && setTextSize(localStorage.getItem("textSize") as 'Small' | 'Medium' | 'Large')

    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <MainRoutes />
    </ThemeProvider>
  );
};

function App() {
  return (
    <DarkModeContextProvider>
      <TextSizeContextProvider>
        <SkillynxApp />
      </TextSizeContextProvider>
    </DarkModeContextProvider>
  );
}

export default App;
