"use client";
import React, { ReactNode } from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";
import {
    Accordion,
    AccordionDetails,
    AccordionProps,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const MuiAccordion = styled((props: AccordionProps) => (
    <Accordion {...props} />
))(({ theme }) => ({
    boxShadow: "none !important", 
    borderRadius: 12,
    "&:not(:last-child)": {
        borderBottom: "none", // Remove the bottom border for all but the last Accordion
    },
    "&:before": {
        display: "none", // Remove the default "plus" icon
    },
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(139, 139, 139, 0.13)",
}));

export const PropertyDetailsAccordion: React.FC<{
    pannelId: string;
    title: string;
    expanded?: boolean;
    onChange?: () => void;
    children: ReactNode;
    bottomGap?: boolean;
    isLight?: boolean;
    sx?: SxProps<Theme>;
}> = (props) => {
    const {
        pannelId,
        title,
        onChange,
        children,
        expanded,
        bottomGap,
        sx,
        isLight = false,
    } = props;
    const [isExpanded, setIsExpanded] = React.useState(true);
    React.useEffect(() => {
        setIsExpanded(expanded ? true : false);
    }, [expanded]);
    return (
        <>
            <MuiAccordion
                expanded={isExpanded}
                sx={{
                    marginBottom: bottomGap ? 2 : 0,
                    padding: 0,
                }}
            >
                <AccordionSummary
                    onClick={() => (onChange ? onChange() : setIsExpanded(!isExpanded))}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={pannelId}
                    id={pannelId}
                    sx={{
                        ...sx,
                        padding: 0,
                        margin: 0,
                    }}
                >
                    {isLight ? (
                        <Typography variant={"body1"} fontWeight={600}>
                            {title}
                        </Typography>
                    ) : (
                        <Typography variant={"h3"} fontWeight={700}>
                            {title}
                        </Typography>
                    )}
                </AccordionSummary>
                <MuiAccordionDetails sx={{ padding: "16px 0 0 0" }}>{children}</MuiAccordionDetails>
            </MuiAccordion>
        </>
    );
};
