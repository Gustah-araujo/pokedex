'use client';

import { pokemonData } from "@/app/interfaces/PokemonData";
import { pokemonSpeciesData } from "@/app/interfaces/PokemonSpeciesData";
import axios from "axios";
// import { unescape } from "querystring";
import { useState } from "react";

interface Params {
    params: {
        pokemon: string
    }
}

export default function Page({params}: Params) {

    const [pokemonData, setPokemonData] = useState<pokemonData | null>(null);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState<pokemonSpeciesData | null>(null);
    const [activeTab, setActiveTab] = useState<string>('about_tab');

    if (pokemonData === null) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
            .then(function (response) {
                setPokemonData(response.data);
            });
    } else {
        if (pokemonSpeciesData == null) {
            axios.get(pokemonData.species.url)
                .then(function (response) {
                    setPokemonSpeciesData(response.data);
                });
        }
    }

    if (pokemonData && pokemonSpeciesData) {
        console.log(pokemonData);
        console.log(pokemonSpeciesData);

        return (
            <div className="w-full flex justify-center">
                <div className={`sm:w-2/4 w-full rounded-xl bg-${pokemonData.types[0].type.name}`}>

                    <div className="w-full py-4">
                        <h2 className="text-center text-xl font-black tracking-widest">
                            {`${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`}
                        </h2>
                    </div>

                    <div className="w-full flex justify-center py-4">
                        <div className="w-1/2 flex justify-evenly">
                            {pokemonData.types.map(function (type) {
                                return (
                                    <div className="sm:w-2/5 w-full text-gray-800 bg-gray-100 bg-opacity-50 py-2 text-center font-black tracking-widest rounded-xl">
                                        {`${type.type.name.charAt(0).toUpperCase()}${type.type.name.slice(1)}`}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full flex justify-center py-4">
                        <img className="sm:w-1/4 w-3/4" src={pokemonData.sprites.other['official-artwork'].front_default} alt="" />
                    </div>

                    <div className="w-full px-4 -mb-8">
                        <div className="bg-gray-50 rounded-3xl px-4 shadow shadow-gray-950">
                            <div className="w-full grid sm:grid-cols-7 grid-cols-1 border-b border-b-gray-950">

                                <button
                                    className={"py-4 px-2 text-black" + (activeTab === 'about_tab' ? ' border-b-2 border-b-purple-500' : '')}
                                    onClick={() => { setActiveTab('about_tab') }}
                                >
                                    ABOUT
                                </button>

                                <button
                                    className={"py-4 px-2 text-black" + (activeTab === 'moves_tab' ? ' border-b-2 border-b-purple-500' : '')}
                                    onClick={() => { setActiveTab('moves_tab') }}
                                >
                                    MOVES
                                </button>

                            </div>

                            <div className="tabs w-full py-4">

                                <div id="about_tab" className={"w-full py-4" + (activeTab === 'about_tab' ? ' block' : ' hidden')}>
                                    <h2 className="text-black">
                                        {pokemonSpeciesData.flavor_text_entries[0].flavor_text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\W_]+/g, " ")}
                                    </h2>
                                </div>

                                <div id="moves_tab" className={"w-full" + (activeTab === 'moves_tab' ? ' block' : ' hidden')}>

                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Move
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Learned at lvl
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Learned by
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pokemonData.moves.map(function (move) {
                                                    return (
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {move.move.name}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {move.version_group_details[0].level_learned_at}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {move.version_group_details[0].move_learn_method.name}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}