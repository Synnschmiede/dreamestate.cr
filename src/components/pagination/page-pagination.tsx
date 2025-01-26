import { Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { TMeta } from "src/types/common";

type Props = {
    meta: TMeta
}

const PagePagination = ({ meta }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const param = new URLSearchParams(window.location.search);
        param.set('page', value.toString());
        router.push(`${pathname}?${param.toString()}`);
        setCurrentPage(value);
    }

    return (
        <Pagination sx={{ mt: 2 }} count={Math.ceil(meta.total / meta.limit)} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" />
    )
};

export default PagePagination;