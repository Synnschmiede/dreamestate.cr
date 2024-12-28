import { TextField } from '@mui/material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { PropertyDetailsContactForm } from './property-details-contact-form';
import { IUploader } from '../_lib/property.interface';

export const PropertyDetailsSidebar = ({ uploader }: { uploader: IUploader | undefined }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: 4,
        borderRadius: 0.5,
        position: 'sticky',
        top: 80,
      }}
    >
      {/* user profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${uploader?.profile_pic}`}
          alt={`${uploader?.first_name} ${uploader?.last_name}`}
          sx={{ width: 58, height: 58 }}
          variant="rounded"
        />
        <Box>
          <Typography variant="body1" fontWeight="bold" color="text.secondary">
            {uploader?.first_name} {uploader?.last_name}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            email: {uploader?.email}
          </Typography>
        </Box>
      </Box>

      {/* Contact Form */}
      <PropertyDetailsContactForm uploader={uploader} />
    </Box>
  );
};
