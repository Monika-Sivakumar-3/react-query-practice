import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  //This function is also provided with the APi response data that we can consume inside the function

  const onSuccess = (data) => {
    console.log("Do something on success", data);
  };

  const onError = (errorData) => {
    console.log("Do something on failure", errorData);
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      //this will disable the default fetch call
      enabled: false,
      //Say you want to navigate to a different page or do something else on APi success or failure
      //We can pass callback functions(onSuccess and onError) which will execute on success or failure
      onSuccess,
      onError,
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
