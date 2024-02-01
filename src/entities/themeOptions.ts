import { ThemeOptions } from "@mui/material";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    common: {
      black: "#2D2D2D",
      white: "#FFFFFF",
    },
    primary: {
      main: "#A1B7A5",
      contrastText: "#252524",
    },
    secondary: {
      main: "#F7F7F7",
      dark: "#DDDDDD",
    },
    success: {
      main: "#A1B7A5",
    },
    error: {
      main: "#DC6567",
    },
    grey: {
      100: "#c9c9c9",
      200: "#F6C973",
      300: "#DC6567",
      400: "#F5F5F5",
      600: "#d5ad5c",
      700: "#7E9C86",
    },
    text: {
      primary: "#4A4B4D",
      secondary: "#7C7D7E",
    },
  },
  typography: {
    allVariants: {
      color: "#7C7D7E",
      fontSize: "1.1rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem",
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    common: {
      white: "#2D2D2D",
      black: "#FFFFFF",
    },
    primary: {
      main: "#A1B7A5",
      contrastText: "#252524",
    },
    secondary: {
      main: "#1C1C1C",
      dark: "#292929",
    },
    success: {
      main: "#A1B7A5",
    },
    error: {
      main: "#FF5252",
    },
    grey: {
      100: "#c9c9c9",
      200: "#F6C973",
      300: "#DC6567",
      400: "#333333",
      600: "#d5ad5c",
      700: "#7E9C86",
    },
    text: {
      primary: "#DDDDDD",
      secondary: "#A8A8A8",
    },
  },
  typography: {
    allVariants: {
      color: "#DDDDDD",
      fontSize: "1.1rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem",
        },
      },
    },
  },
};
