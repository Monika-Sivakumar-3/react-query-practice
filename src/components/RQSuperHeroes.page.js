import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      //Usually when you go to a tab it fetches the data
      //If we set the stale time it won't and it's because by default refetchOnMount: true
      //If we set it to --false-- it won't fetch the data except for the first time
      //If we set it to --always-- it will fetch the data always even if we have stale time
      refetchOnMount: true,
      //Change something in db.json and come back to the page and check
      //In traditional method we can't see the updated data but in RQ we can see the updated data even if we have stale time
      //This is because refetchOnWindowFocus: 'always'
      //If we set it to false the updated data won't be visible until we refresh the screen
      //If we set it to true the updated data will be visible but not during the staleTime duration
      refetchOnWindowFocus: "always",
    }
  );

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <h2>RQSuperHeroes Page</h2>
      {data?.data.map((hero) => (
        <div>{hero.name}</div>
      ))}
    </>
  );
};
