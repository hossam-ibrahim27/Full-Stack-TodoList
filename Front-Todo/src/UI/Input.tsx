import { forwardRef, type InputHTMLAttributes, type Ref } from "react";
import type { TInputType } from "../Types";


interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    type: TInputType;
    inputName: string;
    id: string;
    inputLabel: string;
}
const Input = forwardRef(({ type, id, inputLabel, inputName, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            type={type} name={inputName} id={id} placeholder={inputLabel} ref={ref}
            className="border w-full border-gray-300 shadow-md shadow-slate-200 rounded-md p-2 focus:outline-slate-500 placeholder:text-gray-500"
            {...rest} />
    );
})

export default Input;
