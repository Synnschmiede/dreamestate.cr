"use client";

import { SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { RoundedButton } from "src/components/button/rounded-button";
import { Iconify } from "src/components/iconify";

type Props = {
    path: string;
    title: string;
    sx?: SxProps
};

export const RedirectButton = ({ path, title, sx }: Props) => {
    const router = useRouter();

    const handleRedirect = (path: string) => {
        router.push(path);
    };

    return (
        <RoundedButton
            size="small"
            variant="outlined"
            sx={{
                borderColor: 'text.white',
                marginY: 2,
                color: 'text.white',
                zIndex: 10,
                ...sx
            }}
            endIcon={<Iconify width={18} icon="guidance:left-2-short-arrow" />}
            handleClick={() => handleRedirect(path)}
        >
            {title}
        </RoundedButton>
    )
}