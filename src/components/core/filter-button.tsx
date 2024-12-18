import { Popover, Stack, Typography } from "@mui/material";

interface IFilterPopoverProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
    anchorEl: HTMLElement | null;
    open: boolean
}
export const FilterPopover = ({ children, title, onClose, anchorEl, open }: IFilterPopoverProps) => {
    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            onClose={onClose}
            open={Boolean(anchorEl && open)}
            sx={{ '& .MuiPopover-paper': { mt: '4px', width: '280px' } }}
        >
            <Stack spacing={2} sx={{ p: 2 }}>
                <Typography variant="subtitle2">{title}</Typography>
                {children}
            </Stack>
        </Popover>
    )
}