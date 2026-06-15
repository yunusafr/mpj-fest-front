import { useQuery } from "@tanstack/react-query";
import { getFestivals } from "../api/festivalApi";

export const useFestivals = () => {
  return useQuery({
    queryKey: ["festivals"],
    queryFn: getFestivals,
  });
};