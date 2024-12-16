import { FilterToolbar } from "./filter-toolbar";
import { PropertyGridCard } from "./property-grid-card";

export const ListingMainContent = ({ properties }: any) => {
    console.log(properties, "properties from listing main.....................");
    return (
        <>
            <FilterToolbar />
            <PropertyGridCard />
        </>
    )
};