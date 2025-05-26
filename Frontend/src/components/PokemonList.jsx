import React from "react";
import PokemonCard from "./PokemonCard";
import { usePokemonList } from "../hooks/usePokemonList";

const PokemonList = () => {
  const {
    pokemons,
    loading,
    hasMore,
    search,
    handleSearchChange,
    loadMore,
    error,
  } = usePokemonList();

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500 dark:text-yellow-400">
          Lista de Pokémon
        </h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-2 pl-4 pr-10 rounded-lg border border-red-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white dark:bg-gray-700 dark:border-yellow-500 dark:text-white"
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="text-center text-red-500 dark:text-yellow-400 py-2">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin h-6 w-6 border-3 border-yellow-400 border-t-transparent rounded-full"></div>
            <p className="ml-2 font-medium text-red-500 dark:text-yellow-400">
              Cargando...
            </p>
          </div>
        )}

        {!loading && pokemons.length === 0 && !search && (
          <p className="text-center text-gray-600 dark:text-gray-300 py-6">
            No se encontraron Pokémon.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemons.map((p) => (
            <PokemonCard key={p.name} {...p} />
          ))}
        </div>

        {!loading && hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 text-sm shadow flex items-center"
            >
              <span>Cargar Más</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;