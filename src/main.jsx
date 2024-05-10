import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import React from "react";
import fetchPokemonData from "./script/fetchPokemonData.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: async () => {
      const pokemonList = await fetchPokemonData(
        "https://pokeapi.co/api/v2/pokemon"
      );
      const pokemonUrls = pokemonList.results.map((pokemon) => pokemon.url);
      const pokemonDetails = await Promise.all(
        pokemonUrls.map(fetchPokemonData)
      );

      return { pokemonList, pokemonDetails };
    },
    id: "app",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // ...maybe or maybe not
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
