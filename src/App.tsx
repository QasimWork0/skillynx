import { useContext, useEffect, useLayoutEffect } from "react";
import { darkThemeOptions, lightThemeOptions } from "./entities/themeOptions";
import MainRoutes from "./routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AlertContextProvider, BackgroundContext, BackgroundContextProvider, DarkModeContext, DarkModeContextProvider, TextSizeContext, TextSizeContextProvider } from "data/index";
import { useTranslation } from "react-i18next";
import { AppHeightMin, AppWidthMin } from "entities/constants";

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

const SkillynxApp = () => {
  const { i18n } = useTranslation();
  const { state: darkMode, updateContext: setDarkMode } = useContext(DarkModeContext);
  const { updateContext: setTextSize } = useContext(TextSizeContext);
  const { updateContext: setBackground } = useContext(BackgroundContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < AppWidthMin) {
        window.resizeTo(AppWidthMin, window.innerHeight);
      }
      if (window.innerHeight < AppHeightMin) {
        window.resizeTo(window.innerWidth, AppHeightMin);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useLayoutEffect(() => {
    localStorage.getItem("darkMode") === "true" ? setDarkMode(true) : setDarkMode(false)
    localStorage.getItem("textSize") !== null && setTextSize(parseInt(localStorage.getItem("textSize") as string) as 0 | 1 | 2)
    localStorage.getItem("background") !== null && setBackground(parseInt(localStorage.getItem("background") as string) as 1 | 2 | 3 | 4)

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
      <BackgroundContextProvider>
        <TextSizeContextProvider>
          <AlertContextProvider>
            <SkillynxApp />
          </AlertContextProvider>
        </TextSizeContextProvider>
      </BackgroundContextProvider>
    </DarkModeContextProvider>
  );
}

export default App;
