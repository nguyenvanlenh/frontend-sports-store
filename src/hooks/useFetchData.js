import { useQuery } from "react-query";

const fetchData = async (service) => {
    const { data } = await service();
    return data;
};

export const useFetchData = (key, service, keepPreviousData = false) => {
    return useQuery(
        key,
        () => fetchData(service),
        {
            staleTime: 1000 * 60 * 5,
            refetchInterval: 1000 * 60 * 5,
            keepPreviousData: keepPreviousData,
            onError: (error) => {
                console.error(`Error fetching ${key}:`, error);
            }
        }
    );
};
