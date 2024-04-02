import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const Group = styled(RadioGroup)(() => ({
  columnGap: "2rem",
}));

const Label = styled(FormControlLabel)<{ textsize: string }>(({ theme, textsize }) => ({
  ".MuiTypography-root": {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: textsize,
    marginLeft: '0.4rem'
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
        {options.map((option: string, index:number) => (
          <Label
            key={index}
            value={index}
            control={<StyledRadio />}
            label={t(option)}
            labelPlacement="end"
            textsize={TextSizes[textSize].callout}
          />
        ))}
      </Group>
    </FormControl>
  );
};

export default RadioButtons;
