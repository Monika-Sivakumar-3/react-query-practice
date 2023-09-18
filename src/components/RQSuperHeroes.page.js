import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
  });

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
