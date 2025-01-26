import { TextField } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/use-debounce";

const SearchBox = () => {
    const [searchText, setSearchText] = useState('');

    const searchTerm = useDebounce(searchText);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (searchTerm.length) {
            params.set('searchTerm', searchTerm);
            router.push(`${pathname}?${params.toString()}`);
        } else {
            params.delete('searchTerm');
            router.push(`${pathname}?${params.toString()}`);
        }

    }, [searchTerm]);

    return (
        <TextField placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} sx={{ width: '30%' }} />
    )
}

export default SearchBox