import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  //useQuery hook from react-query is used to fetch data from server
  //it takes two argument one is the unique key(see the imp later) and the other one is a call back function which returns promise
  //Remember: In the previous example(super heroes file) we used two states loading and data to determine the data feched result and to display it

  //We can also get more infos like isLoading from useQuery
  const { isLoading, data, isError, error } = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes1");
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
