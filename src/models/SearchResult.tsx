import { Pokemon } from "./Pokemon"

export interface SearchResult{
    recordCount: number
    pokemons: Array<Pokemon>
}