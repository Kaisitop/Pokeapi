// hooks/usePokemonDetail.js
import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../services/pokemonApi";

export const usePokemonDetail = (name) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchPokemonDetail(name);
        setPokemon(data);
      } catch (error) {
        console.error("Error loading detail", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [name]);

  return { pokemon, loading };
};
