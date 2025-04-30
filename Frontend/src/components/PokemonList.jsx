import React, { useEffect, useState } from "react";
import { fetchPokemons, fetchPokemonDetail } from "../services/pokemonApi";
import { Link } from "react-router-dom";

const PAGE_SIZE = 20;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const loadPokemons = async (reset = false) => {
    setLoading(true);
    try {
      // Si hay búsqueda exacta, buscamos por nombre
      if (search) {
        try {
          const detail = await fetchPokemonDetail(search.toLowerCase());
          const id = detail.id;
          const spriteUrl = detail.sprites.front_default;
          const abilitiesCount = detail.abilities.length;

          const foundPokemon = [
            {
              name: detail.name,
              sprite: spriteUrl,
              abilitiesCount,
            },
          ];

          setPokemons(foundPokemon);
          setHasMore(false); // no mostrar "Cargar más"
          return;
        } catch (error) {
          console.warn("Pokémon no encontrado");
          setPokemons([]); // limpia la lista si no existe
          setHasMore(false);
          return;
        }
      }

      // Si no hay búsqueda, hace paginación normal
      const data = await fetchPokemons(PAGE_SIZE, offset);
      const enriched = await Promise.all(
        data.map(async (pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          let abilitiesCount = 0;
          try {
            const detail = await fetchPokemonDetail(pokemon.name);
            abilitiesCount = detail.abilities.length;
          } catch {
            console.warn(`No se pudo cargar ${pokemon.name}`);
          }

          return { name: pokemon.name, sprite: spriteUrl, abilitiesCount };
        })
      );

      setPokemons((prev) => (reset ? enriched : [...prev, ...enriched]));
      setHasMore(data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error cargando Pokemones", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(true);
  }, [search]);

  useEffect(() => {
    if (offset === 0) return;
    loadPokemons();
  }, [offset]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    setOffset(0);
  };

  const handleLoadMore = () => {
    if (hasMore) setOffset((prev) => prev + PAGE_SIZE);
  };

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
              onChange={handleSearchChange}
              className="w-full p-2 pl-4 pr-10 rounded-lg border border-red-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white dark:bg-gray-700 dark:border-yellow-500 dark:text-white"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin h-6 w-6 border-3 border-yellow-400 border-t-transparent rounded-full"></div>
            <p className="ml-2 font-medium text-red-500 dark:text-yellow-400">
              Cargando...
            </p>
          </div>
        )}

        {!loading && pokemons.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 py-6">
            No se encontraron Pokémon con ese nombre.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemons.map((p) => (
            <Link
              to={`/pokemon/${p.name}`}
              key={p.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-3 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={p.sprite}
                    alt={p.name}
                    className="w-20 h-20 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-base font-bold capitalize text-gray-800 dark:text-gray-100 text-center truncate w-full">
                  {p.name}
                </h2>
                <p className="text-xs text-gray-700 dark:text-yellow-300 mb-2">
                  Habilidades: <span className="font-medium">{p.abilitiesCount}</span>
                </p>
                <div className="w-full bg-blue-100 dark:bg-blue-900 mt-1 rounded text-center py-1 text-xs font-medium text-blue-700 dark:text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  Ver detalle
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!loading && hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 text-sm shadow flex items-center"
            >
              <span>Cargar Más</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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