import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Stack } from '@mui/material';

interface ICitiesSelectorProps {
  value?: string;
  onApply: (value: string) => void;
  handleClose?: () => void;
}

export const CitiesSelector: React.FC<ICitiesSelectorProps> = ({ value, onApply, handleClose }) => {
  const [selectedCity, setSelectedCity] = useState<string>(value || '');

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

  return (
    <Stack spacing={2}>
      <List>
        {cities.map((city) => (
          <ListItem key={city} disablePadding>
            <ListItemButton
              selected={city === selectedCity}
              onClick={() => setSelectedCity(city)} // Update local selection
            >
              <ListItemText primary={city} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        onClick={() => {
          onApply(selectedCity);
          handleClose?.();
        }}
      >
        Apply
      </Button>
    </Stack>
  );
};
