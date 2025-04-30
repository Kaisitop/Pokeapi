from rest_framework import serializers

class PokemonListSerializer(serializers.Serializer): #mostramos los pokemones en lista
    name = serializers.CharField()
    url = serializers.URLField()


class PokemonDetailSerializer(serializers.Serializer): # mostramos detalles de un pokemon
    name = serializers.CharField()
    sprites = serializers.DictField()
    abilities = serializers.ListField()
    types = serializers.ListField()
    weight = serializers.IntegerField()
    height = serializers.IntegerField()
    base_experience = serializers.IntegerField()
    id = serializers.IntegerField()
