const fetchPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};

export default fetchPokemonDetails;
