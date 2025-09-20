import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface IProps {
    children: ReactNode;
    redirected: string;
    isAllowed: boolean;
    data?: unknown
}

const ProtectedPage = ({ children, redirected, data, isAllowed }: IProps) => {
    if (!isAllowed) {
        return <Navigate to={redirected} replace state={data} />
    }
    return children;
};

export default ProtectedPage;