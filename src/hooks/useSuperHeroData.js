import axios from "axios";
import { useQuery } from "react-query";

export const useSuperHeroData = (superHeroId, attributes) => {
  return useQuery(
    ["super-heroes", superHeroId],
    () => {
      return axios.get(`http://localhost:4000/superheroes/${superHeroId}`);
    },
    {
      ...attributes,
    }
  );
};
