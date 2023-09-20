import axios from "axios";
import { useQuery } from "react-query";

//Executing parallel queries is as easy as calling two useQuery hooks

export const RQParallelQueries = () => {
  const {
    isSHDataLoading,
    data: shData,
    isSHDataError,
    shDataError,
  } = useQuery(["super-heroes"], () => {
    return axios.get(`http://localhost:4000/superheroes/`);
  });

  const {
    isFDataLoading,
    data: fData,
    isFDataError,
    fDataError,
  } = useQuery(["friends"], () => {
    return axios.get(`http://localhost:4000/friends/`);
  });

  console.log(shData, fData);

  if (isSHDataError || isFDataError)
    return (
      <h2>
        {shDataError.message} {fDataError.message}
      </h2>
    );
  if (isSHDataLoading || isFDataLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h2>RQSuperHero</h2>
      {shData?.data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
      <h2>Friends</h2>
      {fData?.data.map((friend) => {
        return <div>{friend.name}</div>;
      })}
    </>
  );
};
