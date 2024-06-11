'use client';

import axios from "axios";
import { useState } from "react";
import { pokemonData } from "../interfaces/PokemonData";
import { PokemonsResponsePokemon } from "../interfaces/PokemonsResponse";

interface Props {
    pokemon: PokemonsResponsePokemon
}

export default function Card({pokemon}: Props) {

    const [pokemonData, setPokemonData] = useState<pokemonData|null>(null);

    console.log(pokemon);
    console.log(pokemonData);

    if (pokemonData === null || pokemon.name != pokemonData.name) {
        axios.get(pokemon.url).then(function (response) {
            setPokemonData(response.data);
        });
    }

    if (pokemonData) {


        return (
            <a href={`pokemon/${pokemonData.name}`} className={`pokemon-card border border-gray-950 w-full bg-${pokemonData.types[0].type.name} rounded-xl flex py-6 px-4`}>
                <div className="w-3/5 px-4">
                    <h2 className="text-center font-black tracking-widest">
                        {`#${pokemonData.id} ${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`}
                    </h2>

                    <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
                        { pokemonData.types.map(function (type) {
                            return (
                                <div className={`w-full bg-gray-950 border-2 border-gray-50 rounded text-center px-1`}>
                                    <span className="font-semibold">{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
                                </div>
                            );
                        }) }
                    </div>
                </div>
    
                <div className="w-2/5 flex items-center px-4">
                    <img className="w-full scale-125" src={pokemonData.sprites.other['official-artwork'].front_default} alt="" />
                </div>
    
            </a>
        );
    } else {
        return (
            <div className={`pokemon-card border border-gray-950 w-full bg-gray-200 rounded-xl flex py-6 px-4 animate-pulse`}>
                Loading
            </div>
        );
    }

}