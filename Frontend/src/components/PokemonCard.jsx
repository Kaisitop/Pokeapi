// components/PokemonCard.jsx
import { Link } from "react-router-dom";

const PokemonCard = ({ name, sprite, abilitiesCount }) => (
  <Link
    to={`/pokemon/${name}`}
    className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg border border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300 overflow-hidden group"
  >
    <div className="p-3 flex flex-col items-center">
      <img
        src={sprite}
        alt={name}
        className="w-20 h-20 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
      />
      <h2 className="text-base font-bold capitalize text-gray-800 dark:text-gray-100 text-center truncate w-full">
        {name}
      </h2>
      <p className="text-xs text-gray-700 dark:text-yellow-300 mb-2">
        Habilidades: <span className="font-medium">{abilitiesCount}</span>
      </p>
      <div className="w-full bg-blue-100 dark:bg-blue-900 mt-1 rounded text-center py-1 text-xs font-medium text-blue-700 dark:text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
        Ver detalle
      </div>
    </div>
  </Link>
);

export default PokemonCard;
