import type { SelectHTMLAttributes } from "react";

const SelectedSortBy = ({ ...reset }: SelectHTMLAttributes<HTMLSelectElement>) => {
    return (
        <select name="Sort By" title="Sort By" {...reset}
            className={"cursor-pointer text-white border-none rounded-md py-2 px-3 font-medium flex items-center justify-center bg-slate-800"}>
            <option disabled className="disabled:bg-slate-800">Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
        </select>
    )
}
export default SelectedSortBy;