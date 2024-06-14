import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SelectField({
    label,
    name,
    value,
    options,
    onChange,
    error,
    helperText,
}) {
    return (
        <TextField
            select
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            variant="outlined"
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}