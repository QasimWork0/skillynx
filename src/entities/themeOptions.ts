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
      contrastText: "#3A4754",
    },
    secondary: {
      main: "#F7F7F7",
      dark: "#DDDDDD",
      light: '#D4D4D4'
    },
    success: {
      main: "#7E9C86",
    },
    info:{
      main:'#367FC0',
    },
    warning:{
      main:'#DC6567',
    },
    error: {
      main: "#DD4B39",
    },
    grey: {
      100: "#c9c9c9",
      200: "#F6C973",
      300: "#374755",
      400: "#F5F5F5",
      600: "#d5ad5c",
      700: "#A1B7A5",
      800: '#F2FAF4',
      900: '#FCFCFC',
    },
    text: {
      primary: "#3A4754",
      secondary: "##949494",
    },
  },
  typography: {
    fontFamily:'Helvetica',
    allVariants: {
      color: "#3A4754",
      fontSize: "1rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    common: {
      white: "#2D3339",
      black: "#C2C2C2",
    },
    primary: {
      main: "#A1B7A5",
      contrastText: "#3A4754",
    },
    secondary: {
      main: "#2D3339",
      dark: "#292929",
      light: '#2F2F2F'
    },
    success: {
      main: "#7E9C86",
    },
    info:{
      main:'#367FC0',
    },
    warning:{
      main:'#DC6567',
    },
    error: {
      main: "#DD4B39",
    },
    grey: {
      100: "#c9c9c9",
      200: "#F6C973",
      300: "#2D3339",
      400: "#F2FAF4",
      600: "#515961",
      700: "#374755",
      800: '#494F56',
      900: '#1C1F21',
    },
    text: {
      primary: "#C2C2C2",
      secondary: "#B6B7B7",
    },
  },
  typography: {
    allVariants: {
      color: "#C2C2C2",
      fontSize: "1rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#C2C2C2",
          fontSize: "1rem",
        },
      },
    },
  },
};
