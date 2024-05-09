import { useRouteLoaderData } from "react-router-dom";

function HomePage() {
  const { pokemonList, pokemonDetails } = useRouteLoaderData("app");
  console.log(pokemonList);
  console.log(pokemonDetails.map((pokemon) => pokemon.name));
  return (
    <>
      <h1>{pokemonList.results[0].name}</h1>
      <h2>{pokemonDetails[1].name}</h2>
      <h2>oui oui</h2>
      <button type="button" onClick={() => pokemonList.next}>
        NEXT
      </button>
    </>
  );
}

export default HomePage;
