import { Box, Button, Popover } from "@mui/material";
import React, { ReactNode } from "react";

interface ICustomFilterButtonProps {
    title: string;
    popoverComponent: ReactNode;
};
export const CustomFilterPopover: React.FC<ICustomFilterButtonProps> = ({ title, popoverComponent }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    // Open/Close Popover Handlers
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                endIcon={"minus Icon"}
            >
                {title}
            </Button>

            {/* popover */}

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Box sx={{ padding: 2, width: 250 }}>
                    {React.cloneElement(popoverComponent as React.ReactElement, { handleClose })}
                </Box>
            </Popover>
        </>
    )
}