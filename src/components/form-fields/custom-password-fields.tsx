import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextField, TextFieldProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';



export const CustomPasswordInput: React.FC<TextFieldProps> = ({
    value,
    onChange,
    error,
    onBlur,
    helperText,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl variant="outlined" error={error} fullWidth>
            <TextField
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...props}
            />
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
