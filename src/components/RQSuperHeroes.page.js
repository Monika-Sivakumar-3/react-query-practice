import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData({
    enabled: false,
    onSuccess: (data) => console.log("Success", data),
  });

  const { mutate: addHero } = useAddSuperHeroData({
    onError: (error) => {
      console.error("Error adding hero:", error);
    },
  });

  const handleAddHeroClick = () => {
    console.log("Add Hero button clicked");
    addHero({ name, alterEgo });
  };

  if (isError) return <h2>{error.message}</h2>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      <button onClick={refetch}>Fetch heroes</button>
    </>
  );
};
