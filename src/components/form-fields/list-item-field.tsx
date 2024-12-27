'use client';

import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { KeyboardEvent, useState } from 'react';
import { Iconify } from 'src/components/iconify';

type Props = {
  name: string;
  label?: string;
  setFieldValue: any;
  values: string[];
};
export default function ListItemField({ name, label, setFieldValue, values }: Props) {
  const [item, setItem] = useState<string>('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (item.trim() && !values.includes(item.trim())) {
        setFieldValue(name, [...values, item.trim()]);
        setItem('');
      }
    }
  };

  const handleClick = () => {
    if (item.trim() && !values.includes(item.trim())) {
      setFieldValue(name, [...values, item.trim()]);
      setItem('');
    }
  };

  const handleDeleteItem = (_item: string) => {
    const remaining_item = values ? values.filter((item: string) => item !== _item) : [];
    setFieldValue(name, remaining_item);
  };

  return (
    <>
      <TextField
        label={label}
        value={item || ''}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClick()} edge="end">
                <Iconify icon="ic:round-plus" width={24} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      {values?.length > 0 && (
        <Stack direction="column" spacing={1} sx={{ flexWrap: 'wrap', mt: 2, ml: 1 }}>
          {values.map((item, index) => (
            <Stack direction="row" alignItems="center" gap={1} key={index}>
              <Iconify icon="bi:check-circle" />
              <Typography>{item}</Typography>
              <Iconify
                icon="eva:close-fill"
                onClick={() => handleDeleteItem(item)}
                sx={{ cursor: 'pointer' }}
              />
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}

// export default function FeatureField({ name, setFieldValue, values }: Props) {
//   const [feature, setFeature] = useState<string>('');
//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       if (feature.trim() && !values.includes(feature.trim())) {
//         setFieldValue(`features.${name}`, [...values, feature.trim()]);
//         setFeature('');
//       }
//     }
//   };

//   const handleClick = (field_name: string) => {
//     if (feature.trim() && !(values.features as any)[field_name].includes(feature.trim())) {
//       setFieldValue(`features.${field_name}`, [
//         ...(values.features as any)[field_name],
//         feature.trim(),
//       ]);
//       setFeature('');
//     }
//   };

//   const handleDeleteFeature = (field_name: string, feature_item: string) => {
//     const remaining_item = (values.features as any)[field_name]
//       ? (values.features as any)[field_name].filter((item: string) => item !== feature_item)
//       : [];
//     setFieldValue(`features.${field_name}`, remaining_item);
//   };

//   return (
//     <>
//       <TextField
//         label="Interior features"
//         value={feature || ''}
//         onChange={(e) => setFeature(e.target.value)}
//         onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, 'interior_details')}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => handleClick('interior_details')} edge="end">
//                 <Iconify icon="ic:round-plus" width={24} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         fullWidth
//       />
//       {values.features.interior_details.length > 0 && (
//         <Stack direction="column" spacing={1} sx={{ flexWrap: 'wrap', mt: 2, ml: 1 }}>
//           {values.features.interior_details.map((feature_item, index) => (
//             <Stack direction="row" alignItems="center" gap={1} key={index}>
//               <Iconify icon="bi:check-circle" />
//               <Typography>{feature_item}</Typography>
//               <Iconify
//                 icon="eva:close-fill"
//                 onClick={() => handleDeleteFeature('interior_details', feature_item)}
//                 sx={{ cursor: 'pointer' }}
//               />
//             </Stack>
//           ))}
//         </Stack>
//       )}
//     </>
//   );
// }
