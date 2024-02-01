import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const Group = styled(RadioGroup)(() => ({
  columnGap: "5rem",
}));

const Label = styled(FormControlLabel)<{ textsize: string }>(({ theme, textsize }) => ({
  ".MuiTypography-root": {
    color: theme.palette.common.black,
    fontWeight: "bolder",
    width: "7rem",
    fontSize: textsize,

    [theme.breakpoints.up('sm')]: {
      textAlign: "center",
    },
  },
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.grey[100],
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
}));

const RadioButtons = ({ options, onChange, value }: any) => {
  const { t } = useTranslation()
  const { state: textSize } = React.useContext(TextSizeContext);

  return (
    <FormControl>
      <Group
        row
        aria-labelledby="radio-form-control"
        value={value}
        onChange={onChange}
      >
        <Grid container rowSpacing={0} >
          {options.map((option: string) => (
            <Grid item  sm={4} xs={12}>
              <Label
                key={option}
                value={option}
                control={<StyledRadio />}
                label={t(option)}
                labelPlacement="start"
                textsize={TextSizes[textSize].body}
              />
            </Grid>
          ))}
        </Grid>
      </Group>
    </FormControl>
  );
};

export default RadioButtons;
