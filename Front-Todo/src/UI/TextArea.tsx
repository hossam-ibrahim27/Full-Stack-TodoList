import type { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    areaTitle: string;
    inputName: string
}

const TextArea = ({ areaTitle, inputName, ...reset }: IProps) => {
    return (
        <>
            <textarea placeholder={areaTitle} name={inputName}
                className="border h-48 resize-none w-full border-gray-300 shadow-md shadow-slate-200 rounded-md p-2 focus:outline-slate-500 placeholder:text-gray-500"
                {...reset}
            ></textarea>
        </>
    );
}

export default TextArea;
