const fetchPokemonList = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export default fetchPokemonList;
