"use client";
import type { ButtonProps } from "@mui/material";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface RoundedButtonProps extends ButtonProps {
    children: React.ReactNode;
    handleClick: () => void
}

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 4,
    textTransform: "none",
    padding: theme.spacing(1.5, 3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    fontWeight: theme.typography.fontWeightSemiBold,
    color: "text.secondary"
}))


export const RoundedButton = ({ children, handleClick, ...props }: RoundedButtonProps) => {
    return <StyledButton onClick={handleClick} {...props} endIcon={props.endIcon}>{children}</StyledButton>
}