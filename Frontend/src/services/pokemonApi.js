import axios from 'axios'

const API_URL = "http://localhost:8000/api"



// Listado de pokemones
export const fetchPokemons = async (limit = 20, offset = 0, search = '') => {
    try {
        const params = { limit, offset }
        if (search && search.trim() !== '') {
            params.search = search
        }
        // Siempre usa el endpoint correcto
        const response = await axios.get(`${API_URL}/pokemons/`, { params })
        return response.data
    } catch (error){
        // Si quieres una consola limpia, comenta la siguiente línea:
        // console.error('Error fetching pokemons', error)
        throw error;
    }
}

// Detalles de un pokemon
export const fetchPokemonDetail = async(name) =>{
    try {
        const response = await axios.get(`${API_URL}/pokemons/${name}/`)
        return response.data
    } catch (error) {
        // Si quieres una consola limpia, comenta la siguiente línea:
        // console.error('Error en obtener los detalles del pokemon', error)
        throw error
    }
}