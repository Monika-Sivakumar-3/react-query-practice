import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      //this will disable the default fetch call
      enabled: false,
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
      {/* We can enable the call by executing the refetch function which we get fron useQuery function */}
      <button onClick={refetch}>Fetch SuperHeroess</button>
    </>
  );
};
