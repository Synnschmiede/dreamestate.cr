import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Stack } from '@mui/material';

interface IValuesSelectorProps {
  options: { label: string; value: string }[];
  selectedOptions?: string;
  onApply: (value: string) => void;
  handleClose?: () => void;
  multiple?: boolean;
}

export const ValuesSelector: React.FC<IValuesSelectorProps> = ({
  options,
  selectedOptions,
  onApply,
  handleClose,
  multiple = false,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(selectedOptions?.split(',') || []);

  const handleSelectValue = (new_value: string) => {
    if (new_value === 'ALL') {
      setSelectedValues(['ALL']);
      return;
    }
    const newValues = selectedValues.includes(new_value)
      ? selectedValues.filter((value) => value !== new_value)
      : [...selectedValues, new_value];
    setSelectedValues(newValues);
  };

  return (
    <Stack spacing={2}>
      <List>
        {options.map((option) => (
          <ListItem key={option.value} disablePadding>
            <ListItemButton
              selected={selectedValues.includes(option.value)}
              onClick={() => {
                if (multiple) {
                  handleSelectValue(option.value);
                } else {
                  onApply(option.value);
                  handleClose?.();
                }
              }}
            >
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {multiple && (
        <Button
          variant="contained"
          onClick={() => {
            console.log(selectedValues);
            onApply(selectedValues.filter((value) => value !== '').join(','));
            handleClose?.();
          }}
        >
          Apply
        </Button>
      )}
    </Stack>
  );
};
