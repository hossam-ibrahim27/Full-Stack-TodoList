import type { SelectHTMLAttributes } from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    options: string[] | number[]
}
const SelectedPageSize = ({ title, options, ...reset }: IProps) => {

    return (
        <select name="sortby" title={title} {...reset}
            className={"cursor-pointer text-white border-none rounded-md py-2 px-3 font-medium flex items-center justify-center bg-slate-800"}>
            <option value={title} disabled className="disabled:bg-slate-800">{title}</option>
            {
                options.map((item, idx) =>
                    <option key={idx} value={item} className="text-center w-full outline outline-slate-800">
                        {item}
                    </option>
                )
            }
        </select>
    )
}
export default SelectedPageSize;
