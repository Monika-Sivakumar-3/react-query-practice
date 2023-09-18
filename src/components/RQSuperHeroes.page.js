import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      //Say you have a server where data gets updated frequently we can using polling to refetch the data at a regular interval
      //Eg: Stock price
      //We can do it using polling(refetchInterval) by default it is false
      //API call will have frequently at the given interval
      //When the window loose focus the call will not happen
      refetchInterval: 2000,
      //To fetch data in BG even when the screen is not focused
      refetchIntervalInBackground: true,
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
