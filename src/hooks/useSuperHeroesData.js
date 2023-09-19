import axios from "axios";
import { useQuery } from "react-query";

export const useSuperHeroesData = (enabled) => {
  return useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      enabled,
    }
  );
};
