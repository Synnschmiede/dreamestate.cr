import { Select, MenuItem } from '@mui/material';

interface ICustomSelectProps {
    value: string;
    onChange: (event: any) => void;
    options: { value: string; label: string }[];
}
export const CustomSelect = ({ value, onChange, options, ...props }: ICustomSelectProps) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            sx={{
                minWidth: 120,
                '& .MuiSelect-select': {
                    padding: '10px 12px', 
                },
                '& .MuiOutlinedInput-root': {
                    border: 'none', 
                    boxShadow: 'none',
                },
            }}
            {...props} // Pass any other props like `id`, `name`, `type`, etc.
        >
            {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};