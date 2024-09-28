import { useQuery } from "react-query";

const fetchData = async (service) => {
    const { data } = await service();
    return data;
};

export const useFetchData = (key,
    service,
    keepPreviousData = false,
    staleTime = 1000 * 60 * 5,
    refetchInterval = 1000 * 60 * 5,
    refetchOnMount = false) => {
    return useQuery(
        key,
        () => fetchData(service),
        {
            staleTime: staleTime,
            refetchInterval: refetchInterval,
            refetchOnMount: refetchOnMount,
            keepPreviousData: keepPreviousData,
            onError: (error) => {
                console.error(`Error fetching ${key}:`, error);
            }
        }
    );
};
