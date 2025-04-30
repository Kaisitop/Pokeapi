import requests

POKEAPI_URL = "https://pokeapi.co/api/v2"

def get_pokemon_list(limit=20, offset=0):
    url = f"{POKEAPI_URL}/pokemon/"
    params = {
        "limit": limit,
        "offset": offset
    }
    res = requests.get(url, params=params)

    if res.status_code != 200:
        raise Exception("Error al conectar con la PokeApi")
    
    data = res.json()
    return data

def get_pokemon_detail(name):
    url = f"{POKEAPI_URL}/pokemon/{name}"
    res = requests.get(url)

    if res.status_code != 200:
        raise Exception(f"Pokemon '{name}' no encontrado")
    
    data = res.json()
    return data 
