import { useState, useEffect } from "react";
import { fetchPokemons, fetchPokemonDetail } from "../services/pokemonApi";

const PAGE_SIZE = 20;

export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchChange = (value) => {
    setSearch(value.toLowerCase());
    setOffset(0);
  };

  const loadPokemons = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      if (search) {
        try {
          const detail = await fetchPokemonDetail(search.toLowerCase());
          const foundPokemon = [
            {
              name: detail.name,
              sprite: detail.sprites.front_default,
              abilitiesCount: detail.abilities.length,
            },
          ];
          setPokemons(foundPokemon);
          setHasMore(false);
          setError(null);
          return;
        } catch (err) {
          // No borramos el listado anterior, solo mostramos el error
          setError("Pokémon no encontrado");
          setHasMore(false);
          return;
        }
      }

      const data = await fetchPokemons(PAGE_SIZE, offset);
      const enriched = await Promise.all(
        data.map(async (pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          let abilitiesCount = 0;
          try {
            const detail = await fetchPokemonDetail(pokemon.name);
            abilitiesCount = detail.abilities.length;
          } catch {}
          return { name: pokemon.name, sprite: spriteUrl, abilitiesCount };
        })
      );

      setPokemons((prev) => (reset ? enriched : [...prev, ...enriched]));
      setHasMore(data.length === PAGE_SIZE);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(true);
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (offset === 0) return;
    loadPokemons();
    // eslint-disable-next-line
  }, [offset]);

  const loadMore = () => {
    if (hasMore) setOffset((prev) => prev + PAGE_SIZE);
  };

  return {
    pokemons,
    loading,
    hasMore,
    search,
    handleSearchChange,
    loadMore,
    error,
  };
};