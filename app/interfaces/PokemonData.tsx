export interface pokemonData {
    id: string,
    name: string,
    weight: number,
    species: {
        name: string,
        url: string,
    },
    moves: {
        move: {
            name: string,
            url: string
        },
        version_group_details: {
            level_learned_at: number,
            move_learn_method: {
                name: string,
                url: string
            }
        }[]
    }[],
    types: {
        slot: number,
        type: {
            name: string,
            url: string
        }
    }[],
    sprites: {
        back_default: string,
        back_female: string,
        back_shiny: string,
        back_shiny_female: string,
        front_default: string,
        front_female: string,
        front_shiny: string,
        front_shiny_female: string,
        other: {
            "official-artwork": {
                front_default: string,
                front_shiny: string,
            }
        }
    },
};