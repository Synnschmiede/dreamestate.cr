import { Autocomplete, Chip, TextField } from "@mui/material";

type Props = {
    options: { label: string, value: string }[],
    values: string[],
    setFieldValue: any,
    label: string;
    placeholder: string;
    name: string;
}

export const AutoCompleteWithAdding = ({ options, values, setFieldValue, label, placeholder, name }: Props) => {
    return (
        <Autocomplete
            fullWidth
            multiple
            limitTags={3}
            freeSolo
            options={options}
            value={values.map(tagValue => {
                const existingOption = options.find(option => option.value === tagValue);
                return existingOption || { value: tagValue, label: tagValue };
            })}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            filterOptions={(options, params) => {
                const filtered = options.filter(option =>
                    option.label.toLowerCase().includes(params.inputValue.toLowerCase())
                );

                // If no options match, show a button to add the new option
                if (params.inputValue !== '' && filtered.length === 0) {
                    return [
                        {
                            label: `Add "${params.inputValue}"`,
                            value: params.inputValue,
                            isNew: true,
                        },
                    ];
                }

                return filtered;
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.value}>
                    {option.label}
                </li>
            )}
            renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        key={option.value}
                        label={option.label}
                        size="small"
                        variant="soft"
                    />
                ))
            }
            onChange={(event, newValue) => {
                setFieldValue(
                    name,
                    newValue.map(item => typeof item !== 'string' && item.value)
                );
            }}
        />
    )
}