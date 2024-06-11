'use client';

import axios from "axios";
import { useState } from "react";
import Card from "./components/card";
import { PokemonsResponsePokemon, PokemonsResponse } from "./interfaces/PokemonsResponse";

export default function Home() {

    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=100");
    const [isReady, setIsReady] = useState<boolean>(false);
    const [pokemonsData, setPokemonsData] = useState<PokemonsResponse | null>(null);
    const [pokemons, setPokemons] = useState<Array<PokemonsResponsePokemon>>([]);
    const [shownPokemons, setShownPokemons] = useState<Array<PokemonsResponsePokemon>>([]);
    const [search, setSearch] = useState<string>('');

    async function loadPokemons(url: string) {
        if (url === null) {
            setShownPokemons(pokemons.slice(0, 20));
            setIsReady(true);
            return;
        }

        return await axios.get(url)
            .then(function (response) {
                setUrl(response.data.next);
                setPokemonsData(response.data);
                setPokemons(pokemons.concat(response.data.results));
            });
    }

    if (!isReady) {
        loadPokemons(url);
    }

    if (isReady) {
        return (
            <div>
                <form
                    className="w-full py-4"
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (search) {
                            setShownPokemons(pokemons.filter( (pokemon: PokemonsResponsePokemon) => pokemon.name.includes(search) ));
                        } else {
                            setShownPokemons(pokemons.slice(0, 20));
                        }
                    }}
                >
                    <input 
                        id="search" 
                        className="bg-gray-50 text-black py-2 px-4 rounded-xl" 
                        type="text" 
                        name="search"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }} 
                    />
                </form>

                <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 border-4 border-gray-950">

                    {
                        shownPokemons.map(function (pokemon: PokemonsResponsePokemon) {
                            return <Card pokemon={pokemon} />;
                        })
                    }

                </div>

                {
                    (pokemonsData !== null && !search) ? (
                        <div className="w-full flex justify-center py-5">
                            <button
                                className="bg-gray-300 py-4 px-10 text-black rounded-xl"
                                onClick={() => {
                                    let newShownPokemons = shownPokemons;

                                    newShownPokemons = newShownPokemons.concat( pokemons.slice( shownPokemons.length, shownPokemons.length + 19 ) );

                                    setShownPokemons(newShownPokemons);
                                }}
                            >
                                Load more
                            </button>
                        </div>
                    ) : null
                }

            </div>
        );
    } else {
        return null;
    }
}
