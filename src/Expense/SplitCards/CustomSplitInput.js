import React from "react";
import { TextField, InputAdornment,Divider  } from "@mui/material";

const CustomSplitInput = ({ splitTypeText,handleInputChange,userId}) => {
  return (
    <>
    <TextField
    fullWidth
      variant="outlined"
      defaultValue="0"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {splitTypeText}
            <Divider orientation="vertical" flexItem sx={{ mx: 1}} />
          </InputAdornment>
        ),
        inputProps: { 
          style: { textAlign: 'center' }
        }
      }} 
      onChange={(e)=>handleInputChange(e,userId)}
    />
    </>
      
  );
};

export default CustomSplitInput;
