import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  //To get data of a individual super hero
  const params = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(params.id);

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <h2>RQSuperHero Page</h2>
      <div>{data.data.name}</div>
      <div>{data.data.alterEgo}</div>
    </>
  );
};
