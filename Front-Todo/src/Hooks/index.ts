import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../configuration/axios.config";
import type { AxiosRequestConfig } from "axios";
interface IProps {
    url: string;
    config?: AxiosRequestConfig;
    queryKey: string[]
}

const useAuthenticatedQuery = ({ url, config, queryKey }: IProps) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance.get(url, config);
            return data
        }
    })

}

export default useAuthenticatedQuery;