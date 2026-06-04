import { useQuery } from "@tanstack/react-query";
import { festivalApi } from "../api/festivalApi";

export const useActiveFestival = () =>
  useQuery({
    queryKey: ["active-festival"],
    queryFn: festivalApi.getActive,
  });   