"use client"

import type { TextFieldProps } from "@mui/material";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled((props: TextFieldProps) => (
    <TextField {...props} />
))(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
        border: "none",
    },
    " & .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    '& .MuiInputAdornment-root': {
        marginRight: 8, // Add margin to ensure the icon isn't too close to the input text
    },
}));
