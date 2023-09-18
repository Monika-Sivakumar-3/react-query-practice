import axios from "axios";
import { useQuery } from "react-query";

export const RQSuperHeroesPage = () => {
  //The first time we click on RQ super heroes isLoading is set to true and a network call is sent to fetch data
  //Once the request is completed the data is cached using the key and the fetch superhero function as the unique identifiers
  //Usually by default it caches the data for 5 mins
  //What happens in the background?
  // // React query checks if we have the cached data. If yes then it sends the data without setting the isLoading to true
  // // However a refetch is done in the bg and if the fetch is successfull the updated data is sent to the client,
  // // in our case there is no change in data so we are not seeing any diff

  //Now that the isLoading state is set to false how do we know the bg fetching is done?
  //We have another state called isFetching

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    //as mentioned earlier the default cache time is 5 mins
    //We can reafctor it by passing a third argument to the useQuery hook which take an object with multiple attriibute
    //cacheTime is one of it
    //Set it to 5secs whhich is 5000ms and check the activity in devtools
    //If you go to RQ and go back to home page 'super-heros' will be agrbage collected after 5secs
    {
      cacheTime: 5000,
      //Say you know that your data doesn't change often and it's okay if your user sees the updated data after 30s
      //We know that the data is fetched in the bg even if we cache it
      //What if we don't want to fetch the data again if the user navigates to this page?
      //We can set a stale time and during that time if we go to that page again and again API call wil not be made
      //It stays in fresh state for 30s and then go to stale state
      staleTime: 30000,
      //In this case no call would be made for 30s after 1st call
      //By default it is 0s
    }
  );

  //Click on load icon in the browser, click "Empty cache and hard reload"
  //In devtools-> network set throttling to fast 3g just to see the differnce
  //In traditional method you will see the loading text each time you navigate to that component, but in RQ you won't see it
  //You can see isLoading and isFetching state
  //To check the functionality first go to RQ page and then go to db.json file and update any name and save it
  // Now go back to home page and come back to RQ page where you can see the old cached data first and then you can see the updated name
  console.log("isLoading: ", isLoading, "isFetching:", isFetching);

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
