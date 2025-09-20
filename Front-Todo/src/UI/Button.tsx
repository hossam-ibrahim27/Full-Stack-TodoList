import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { TButtonType } from "../Types";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: TButtonType;
    children: ReactNode;
    buttonWidth: "w-full" | "w-fit";
    variant: string;
    isLoading?: boolean;
    paginator?: boolean
}

const Button = ({ type, children, buttonWidth, variant, paginator = true, isLoading, ...reset }: IProps) => {
    return (
        <button type={type} className={`${buttonWidth} ${variant} disabled:bg-slate-400 disabled:cursor-not-allowed text-gray-50 rounded-md cursor-pointer font-medium`}
            {...reset} disabled={isLoading} >
            {isLoading ? paginator ?
                <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> : null : null
            }
            {children}
        </button>
    );
}

export default Button;
