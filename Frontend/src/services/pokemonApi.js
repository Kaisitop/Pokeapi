import axios from 'axios'

const API_URL = "http://127.0.0.1:8000/api"

//listado de pokemones
export const fetchPokemons = async (limit = 100000, offset = 0, search = '') => {
    try {
        const params = { limit, offset }
        if(search) params.search = search
        
        const response = await axios.get(`${API_URL}/pokemons/`, {params})
        return response.data

    } catch (error){
        console.error('Error fetching pokemons', error)
        throw error;
    }
}

//detalles de un pokemon

export const fetchPokemonDetail = async(name) =>{
    try {
        const response = await axios.get(`${API_URL}/pokemons/${name}/`)
        return response.data
    } catch (error) {
        console.error('Error en obtener los detalles del pokemon', error)
        throw error
    }
}