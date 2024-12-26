import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Iconify } from '../iconify';

interface IImageUploaderProps {
  value?: string | File;
  onFileSelect: (file: File) => void;
  onDelete?: () => void;
  disabled?: boolean;
}
export const ImageUploader: React.FC<IImageUploaderProps> = ({
  value,
  onFileSelect,
  onDelete,
  disabled = false,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState('');

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onFileSelect(file);
    }
  };

  React.useEffect(() => {
    if (!previewUrl) {
      if (typeof value === 'string') {
        setPreviewUrl(value);
      } else if (value instanceof File) {
        const imageUrl = URL.createObjectURL(value);
        setPreviewUrl(imageUrl);
      }
    }
  }, [value]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Image
        src={previewUrl || '/assets/images/default_avatar.png'}
        alt="Uploaded Image"
        width={200}
        height={200}
        style={{
          objectFit: 'cover',
          borderRadius: '10px',
          border: '1px solid #333',
        }}
      />

      {disabled ? null : (
        <Box
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <Iconify icon="eva:edit-fill" width={20} height={20} />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Box>
      )}
    </Box>
  );
};
