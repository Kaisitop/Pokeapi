from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from . import services
from .serializers import PokemonDetailSerializer, PokemonListSerializer

class PokemonViewSet(viewsets.ViewSet):
    #Viewset para listar y obtener los detalles de pokemon

    def list(self, request):
        #endpoint get /pokemons/ , lista pokemon con paginacion y busqueda

        limit = int(request.query_params.get('limit', 20))
        offset = int(request.query_params.get('offset', 0))
        search = request.query_params.get('search')

        data = services.get_pokemon_list(limit=limit, offset=offset)
        pokemons = data['results']

        #busqueda por nombres
        if search:
            pokemons = [p for p in pokemons if search.lower() in p['name'].lower()]

        serializer = PokemonListSerializer(pokemons, many= True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        #endpoint get /pokemons/<name>/ , mostramos detalles de un pokemon en especifico

        try:
            pokemon_data = services.get_pokemon_detail(pk)
            serializer = PokemonDetailSerializer(pokemon_data)
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_404_NOT_FOUND)