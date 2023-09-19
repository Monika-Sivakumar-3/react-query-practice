import axios from "axios";
import { useQuery } from "react-query";

export const useSuperHeroesData = (attributes) => {
  return useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      ...attributes,
    }
  );
};
