import { IconButton, Stack, Typography } from "@mui/material";
import { UseBooleanReturn } from "src/hooks/use-boolean";
import { ConfirmationDialog } from "../dialog/confirmation-dialog";
import { Iconify } from "../iconify";

type Props = {
    totalSelected: number;
    action: UseBooleanReturn;
    onConfirm: () => void;
    message?: string;
}

export default function TableSelectedAction({ action, onConfirm, message, totalSelected }: Props) {
    return (
        <>
            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 3, py: 1, borderRadius: '20px 20px 0 0', backgroundColor: 'primary.lighter' }}>
                <Typography variant='caption' sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1rem' }}>{totalSelected} selected</Typography>
                <IconButton color='success' title="Delete" onClick={action.onTrue}>
                    <Iconify width={18} icon="material-symbols:delete" />
                </IconButton>
            </Stack>
            <ConfirmationDialog
                open={action.value}
                onClose={action.onFalse}
                message={message || 'Are you sure you want to delete?'}
                onConfirm={onConfirm}
            />
        </>
    );
}