export interface Pokemon{
    id: number
    name: string
    url: string
}

export interface PokemonDetails{
    name: string
    base_experience: number
    height: number
    weight: number
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