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
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const CustomAccordion: React.FC<{
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
  const [isExpanded, setIsExpanded] = React.useState(false);
  React.useEffect(() => {
    setIsExpanded(expanded ? true : false);
  }, [expanded]);
  return (
    <>
      <MuiAccordion
        expanded={isExpanded}
        sx={{ marginBottom: bottomGap ? 2 : 0 }}
      >
        <AccordionSummary
          onClick={() => (onChange ? onChange() : setIsExpanded(!isExpanded))}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={pannelId}
          id={pannelId}
          sx={{ ...sx, boxShadow: isExpanded ? "0px 2px 0px #d9d9d9" : "none" }}
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
        <MuiAccordionDetails>{children}</MuiAccordionDetails>
      </MuiAccordion>
    </>
  );
};
