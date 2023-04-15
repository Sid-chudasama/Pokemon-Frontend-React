export interface Pokemon{
    id: number
    name: string
    url: string
    pokemonDetail: PokemonDetails
}

export interface PokemonDetails{
    experience: number
    height: number
    weight: number
}

export interface PokemonDetailsExt{
    abilities: Array<Ability>
    species: Species
}

export interface Ability{
    ability: Ability1
}

export interface Ability1{
    name: string
    url: string
}

export interface Species{
    name: string
}