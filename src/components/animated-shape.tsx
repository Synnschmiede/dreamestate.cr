"use client";

import React from "react";

import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

import { pxToRem } from "src/theme/styles";

interface AnimatedShapeProps {
    shape: string; // Image URL or path
    animationType: "leftToRight" | "topToBottom" | "spin";
    size: { width: number; height: number }; 
    duration?: number;
}

export const AnimatedShape: React.FC<AnimatedShapeProps> = ({
    shape,
    animationType,
    size: { width = 40, height = 40 },
     duration = 3
}) => {
    const animations = {
        leftToRight: keyframes`
            0% { transform: translateX(0); }
            100% { transform: translateX(40px); }    `,
        topToBottom: keyframes`
            0% { transform: translateY(0); }
            100% { transform: translateY(40px); } 
        `,
        spin: keyframes`
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        `,
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: `${width}px`,
                height: `${height}px`,
                // overflow: "hidden",
                padding: pxToRem(20),
                zIndex: 20
            }}
        >
            <Box
                component="img"
                src={shape}
                alt="animated shape"
                sx={{
                    position: "absolute",
                    animation: `${animations[animationType]} ${duration}s linear infinite ${animationType === "spin" ? "" : "alternate"} `,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
        </Box>
    );
};

