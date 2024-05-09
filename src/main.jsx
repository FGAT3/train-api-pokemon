import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import React from "react";
import fetchPokemonList from "./script/fetchPokemonList.jsx";
import fetchPokemonDetails from "./script/fetchPokemonDetails.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: async () => {
      const pokemonList = await fetchPokemonList();
      const pokemonUrls = pokemonList.results.map((pokemon) => pokemon.url);
      const pokemonDetails = await Promise.all(
        pokemonUrls.map(fetchPokemonDetails),
      );

      return { pokemonList, pokemonDetails };
    },
    id: "app",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // ...
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
