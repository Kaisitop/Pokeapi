from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from . import services
from .serializers import PokemonDetailSerializer, PokemonListSerializer


class PokemonViewSet(viewsets.ViewSet):
    """
    ViewSet para listar y obtener los detalles de los Pokémon.
    """

    def list(self, request):
        # Obtener parámetros de paginación y búsqueda
        try:
            limit = int(request.query_params.get('limit', 20))
            offset = int(request.query_params.get('offset', 0))
        except ValueError:
            return Response({'detail': 'Parámetros inválidos'}, status=status.HTTP_400_BAD_REQUEST)

        search = request.query_params.get('search', '').lower()

        try:
            # Llamar a servicio externo
            data = services.get_pokemon_list(limit=limit, offset=offset)
            pokemons = data.get('results', [])

            if not isinstance(pokemons, list):
                return Response({'detail': 'Formato de datos inesperado'}, status=400)

            # Filtro por nombre (búsqueda)
            if search:
                pokemons = [p for p in pokemons if search in p['name'].lower()]

            serializer = PokemonListSerializer(pokemons, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({'detail': 'Error al obtener pokemons', 'error': str(e)}, status=400)

    def retrieve(self, request, pk=None):
        """
        Endpoint GET /pokemons/<nombre>/
        """
        try:
            pokemon_data = services.get_pokemon_detail(pk)
            serializer = PokemonDetailSerializer(pokemon_data)
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_404_NOT_FOUND)
