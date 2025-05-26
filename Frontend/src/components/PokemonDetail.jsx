// components/PokemonDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import PokemonInfoCard from "./PokemonInfoCard";

const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading } = usePokemonDetail(name);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500 dark:text-yellow-400 animate-pulse">
            Cargando Pokémon...
          </p>
          <div className="animate-spin mt-3 h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900">
        <p className="text-lg font-bold text-red-600 dark:text-red-400">
          No se pudo cargar el Pokémon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 p-4">
      <PokemonInfoCard pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetail;
