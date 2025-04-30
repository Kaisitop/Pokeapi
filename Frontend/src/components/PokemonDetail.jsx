import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemonDetail } from '../services/pokemonApi';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchPokemonDetail(name);
        setPokemon(data);
      } catch (error) {
        console.error('Error loading detail', error);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500 dark:text-yellow-400 animate-pulse">Cargando Pokémon...</p>
          <div className="animate-spin mt-3 h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 dark:bg-gray-900">
        <p className="text-lg font-bold text-red-600 dark:text-red-400">No se pudo cargar el Pokémon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300">
        <div className="flex items-center mb-4">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 object-contain drop-shadow-md" />
          <div className="ml-4">
            <h1 className="text-2xl font-bold capitalize text-gray-800 dark:text-white">
              {pokemon.name}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">ID: {pokemon.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center mb-4 text-sm border-t border-b border-gray-200 dark:border-gray-700 py-3">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Altura</p>
            <p className="font-bold text-gray-800 dark:text-white">{pokemon.height}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Peso</p>
            <p className="font-bold text-gray-800 dark:text-white">{pokemon.weight}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">EXP</p>
            <p className="font-bold text-yellow-500">{pokemon.base_experience}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-y-3 mb-1">
          <div className="w-1/2">
            <h2 className="text-base font-bold text-red-500 dark:text-yellow-400 mb-2">Tipos</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((t, i) => (
                <span key={i} className="bg-blue-500 text-white px-3 py-1 rounded-full capitalize text-xs font-medium">
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-1/2">
            <h2 className="text-base font-bold text-red-500 dark:text-yellow-400 mb-2">Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a, i) => (
                <span key={i} className="bg-red-500 text-white px-3 py-1 rounded-full capitalize text-xs font-medium">
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-full transition-all duration-300 text-sm"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;