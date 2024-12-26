import React from "react";
export const usePopup = () => {
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);


    const handleToggle = React.useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    return { anchorRef, open, handleOpen, handleClose, handleToggle };
}