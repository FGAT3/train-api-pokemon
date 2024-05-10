import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import fetchPokemonData from "../script/fetchPokemonData";
import capitalizeWords from "../script/capitalizeWords";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import noPokemonImg from "../assets/images/pikachu-error.png";

function HomePage() {
  const { pokemonList, pokemonDetails } = useRouteLoaderData("app");
  const [newPokemonList, setNewPokemonList] = useState(pokemonList);
  const [newPokemonDetails, setNewPokemonDetails] = useState(pokemonDetails);
  const [counterPokemonList, setCounterPokemonList] = useState(
    pokemonList.results.length
  );

  const handlePokemonClick = async (url) => {
    if (url)
      try {
        const dataList = await fetchPokemonData(url);
        setNewPokemonList(dataList);
        const dataDetails = await Promise.all(
          dataList.results.map((pokemon) => pokemon.url).map(fetchPokemonData)
        );
        setNewPokemonDetails(dataDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
  };

  return (
    <>
      <section className="swipe-pokemon-cards">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="mySwiper"
        >
          {newPokemonDetails.map((pokemon) => (
            <SwiperSlide key={pokemon.id}>
              {pokemon.sprites.front_default ? (
                <img
                  className="pokemon-img"
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} picture`}
                />
              ) : (
                <>
                  <img
                    className="no-pokemon-img"
                    src={noPokemonImg}
                    alt={"No picture available for this pokemon"}
                  />
                  <p className="no-pokemon-text">
                    No picture available for this Pokémon
                  </p>
                </>
              )}
              <p className="pokemon-name">{capitalizeWords(pokemon.name)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <p className="counter-pokemon-list">
        {counterPokemonList} / {newPokemonList.count}{" "}
      </p>

      <section className="button-container">
        <button
          type="button"
          className="prev-button"
          onClick={() => {
            counterPokemonList > pokemonList.results.length &&
              setCounterPokemonList((prevCount) =>
                Math.max(prevCount - newPokemonList.results.length, 0)
              ),
              handlePokemonClick(newPokemonList.previous);
          }}
        >
          Previous
        </button>

        <button
          type="button"
          className="next-button"
          onClick={() => {
            if (counterPokemonList < pokemonList.count)
              setCounterPokemonList((prevCount) =>
                Math.min(
                  prevCount + newPokemonList.results.length,
                  pokemonList.count
                )
              );
            if (newPokemonList.next) {
              handlePokemonClick(newPokemonList.next);
            }
          }}
        >
          Next
        </button>
      </section>
    </>
  );
}

export default HomePage;
