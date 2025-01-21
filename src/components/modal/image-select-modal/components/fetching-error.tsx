"use client"

import { m } from 'framer-motion';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { ServerErrorIllustration } from 'src/assets/illustrations';

import { MotionContainer, varBounce } from 'src/components/animate';
import { TFileErrorData } from '../lib/type';
import { getErrorName } from '../lib/utils';

export function FetchingError({
    errorResponse,
    statusCode,
    inModal = false,
}: {
    errorResponse?: TFileErrorData;
    statusCode?: number;
    inModal?: boolean;
}) {

    return (
        <Stack
            direction="column"
            alignItems="center"
            component={MotionContainer}
            sx={{ px: 4, py: inModal ? 0 : { xs: 8, sm: 6, lg: 7 } }}
        >
            <m.div variants={varBounce().in}>
                <Typography variant={inModal ? 'h5' : 'h3'} sx={{ mb: 1 }}>
                    {statusCode || 500} {getErrorName(statusCode || 500)}
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <Typography sx={{ color: 'text.secondary' }}>
                    {errorResponse?.message ? errorResponse.message : 'Internal Server Error'}
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <ServerErrorIllustration
                    sx={{ my: inModal ? { xs: 1, sm: 3 } : { xs: 4, sm: 6 }, width: '300px' }}
                />
            </m.div>

            {!inModal && (
                <Button component={RouterLink} href="/" size="large" variant="contained">
                    Go to home
                </Button>
            )}
        </Stack>
    );
}
