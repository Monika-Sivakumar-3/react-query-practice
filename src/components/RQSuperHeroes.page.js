import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  //This is good for our app but it is not so effecient for larger Apps
  //What is more components need this data
  //We will have to rewrite this code in all those components
  //To avoid this we are going to create a custom hook

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData({
    enabled: false,
    onSuccess: (data) => console.log("Success", data),
  });

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <h2>RQSuperHeroes Page</h2>
      {data?.data.map((hero) => (
        <>
          <a href={`/rq-super-heroes/${hero.id}`}>{hero.name}</a>
          <br />
        </>
      ))}
      <button onClick={refetch}>Fetch</button>
    </>
  );
};
