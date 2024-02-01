import React, { useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import ImageComponent from "ui/components/shared/ImageComponent";
import SkillynxLogo from "assets/logos/skillynx_text_logo.png";
import SettingsCard from "./cards/SettingsCard";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  boxShadow: `8px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.07)':'rgba(255, 255, 255, 0.07)'}`,
}));

const ListElement = styled(ListItem)<{ active?: string }>(
  ({ theme, active }) => ({
    height: "6.6rem",
    padding: 0,
    background: active ? theme.palette.secondary.main : "none",
  })
);

const ListButton = styled(ListItemButton)(() => ({
  height: "100%",
  paddingLeft: "1.5rem",
}));

const Title = styled(Typography)(({ theme }) => ({
  padding: "1.2rem",
  fontWeight: "Bold",
  paddingBottom: 0,
}));

const CardsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: '100%',
  marginBottom: '3rem'
}));

const SettingsDrawer = ({ active, setActive, options }: any) => {
  const { state: textSize } = useContext(TextSizeContext)
  return (
    <WrapperBox>
      <Box sx={{ margin: '0.6rem 0 0 1.4rem' }}>
        <ImageComponent
          src={SkillynxLogo}
          alt="Logo"
          height="auto"
          width="250px"
        />
      </Box>
      <Title color="primary" fontSize={TextSizes[textSize].title1}>Settings</Title>
      <CardsBox>
        <List>
          {options.slice(0, -2).map((option: any) => (
            <ListElement
              key={option.label}
              active={option.label === active.label ? "true" : undefined}
            >
              <ListButton onClick={() => setActive(option)}>
                <SettingsCard label={option.label} image={option.image} />
              </ListButton>
            </ListElement>
          ))}
        </List>
        <List>
          {options.slice(-2).map((option: any) => (
            <ListElement
              key={option.label}
              active={option.label === active.label ? "true" : undefined}
            >
              <ListButton onClick={() => setActive(option)}>
                <SettingsCard label={option.label} image={option.image} />
              </ListButton>
            </ListElement>
          ))}
        </List>
      </CardsBox>
    </WrapperBox>
  );
};

export default SettingsDrawer;
