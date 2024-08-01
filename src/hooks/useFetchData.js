import { useQuery } from "react-query";

const fetchData = async (service) => {
    const { data } = await service();
    return data;
};


export const useFetchData = (key, service) => {
    return useQuery(key, () => fetchData(service), {
        staleTime: 1800000,
        refetchInterval: 1800000,
        onError: (error) => {
            console.error(`Error fetching ${key}:`, error);
        }
    });
};