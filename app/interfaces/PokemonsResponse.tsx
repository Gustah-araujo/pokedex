export interface PokemonsResponsePokemon {
    name: string,
    url: string
}

export interface PokemonsResponse {
    data: {
        results: PokemonsResponsePokemon[]
    }
}