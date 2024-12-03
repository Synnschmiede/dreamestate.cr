"use client";

import React from "react";

import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

interface AnimatedShapeProps {
    shape: string; // Image URL or path
    animationType: "leftToRight" | "topToBottom" | "spin";
    parentSize: { width: number; height: number }; // Parent container dimensions
}

const animations = {
    leftToRight: keyframes`
        0% { transform: translateX(0); }
        100% { transform: translateX(100%); }
    `,
    topToBottom: keyframes`
        0% { transform: translateY(0); }
        100% { transform: translateY(100%); }
    `,
    spin: keyframes`
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    `,
};

export const AnimatedShape: React.FC<AnimatedShapeProps> = ({
    shape,
    animationType,
    parentSize,
}) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: `${parentSize.width}px`,
                height: `${parentSize.height}px`,
                overflow: "hidden",
            }}
        >
            <Box
                component="img"
                src={shape}
                alt="animated shape"
                sx={{
                    position: "absolute",
                    animation: `${animations[animationType]} 3s linear infinite alternate`,
                    width: "40px", 
                    height: "80px",
                }}
            />
        </Box>
    );
};
