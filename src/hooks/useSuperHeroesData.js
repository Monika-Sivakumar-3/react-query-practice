import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

export const useSuperHeroesData = (attributes) => {
  return useQuery(
    "super-heroes",
    () => {
      return request({ url: "/superheroes" });
    },
    {
      ...attributes,
    }
  );
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useAddSuperHeroData = (attributes) => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // console.log("Successsss", data);
      // queryClient.invalidateQueries("super-heroes");
    },
    //getting the data from the API and setting it to the cache so that we get the data spontaneously
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    ...attributes,
  });
};
