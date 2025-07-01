import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useEvents = (searchValue='') => {
               
                    
    
  const axiosSecure = useAxiosSecure();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events",searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/events?search=${searchValue}`);
      return res.data;
    },
  });

  return [events, isLoading, refetch];
};

export default useEvents;
