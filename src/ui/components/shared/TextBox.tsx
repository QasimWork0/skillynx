import React, { useContext, useState } from "react";
import { Typography, TextField, Grid, styled, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextSizeContext } from "data/index";
import { TextSizes } from "entities/constants";

const GridItem = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: "bolder",
  color: theme.palette.common.black,
}));

const TextInput = styled(TextField)<{ showerror?: string }>(
  ({ theme, showerror }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: showerror ? "0 calc(0.6rem - 2px)" : "1px 0.6rem",
    borderRadius: "0.5rem",
    border: showerror && `1px solid ${theme.palette.error.main}`,
    ":focus-within": {
      border: `1px solid ${theme.palette.primary.main}`,
      padding: "0 calc(0.6rem - 2px)",
    },
  })
);

const TextBox = ({
  label,
  value,
  onChange,
  error = false,
  type = "text",
  gridXs = [4,8]
}: any) => {
  const { state: textSize } = useContext(TextSizeContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container>
      <GridItem item xs={gridXs[0]}>
        <Label fontSize={TextSizes[textSize].body}>{label}</Label>
      </GridItem>
      <GridItem item xs={gridXs[1]}>
        <TextInput
          showerror={error ? "true" : undefined}
          type={type==='password'? showPassword ? 'text' : 'password' : type}
          onChange={onChange}
          value={value}
          variant="standard"
          InputProps={{
            sx:{fontSize: TextSizes[textSize].body},
            disableUnderline: true,
            endAdornment: ( 
              type === 'password' && value &&
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff color="primary"/> : <Visibility color="primary"/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </GridItem>
    </Grid>
  );
};

export default TextBox;
