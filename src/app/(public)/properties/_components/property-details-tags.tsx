import { Chip, Stack } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { PropertyDetailsAccordion } from './property-details-accordion';
import { PropertyDetailsContainer } from './property-details-container';

export const PropertyDetailsTags = ({
    data,
}: {
    data: string[];
}) => {
    return (
        <PropertyDetailsContainer>
            <PropertyDetailsAccordion pannelId="tags" title="Tags" expanded isLight>
                <Stack direction='row' gap={1} alignItems='center' sx={{ flexWrap: 'wrap' }}>
                    {
                        data.map((tag) => (
                            <Chip key={tag} variant='soft' color='primary' label={tag} icon={<Iconify icon="carbon:tag" />} sx={{ borderRadius: 2, px: 1 }} />
                        ))
                    }
                </Stack>
            </PropertyDetailsAccordion>
        </PropertyDetailsContainer>
    );
};
