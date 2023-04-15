import axios from "axios"
import { useState } from "react"
import { Pokemon, PokemonDetailsExt } from "../models/Pokemon"
import Collapse from "react-bootstrap/esm/Collapse"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

type DetailsProps = {pokemon: Pokemon}
const Details = ({pokemon}: DetailsProps) => {
    const [expand, setExpand] = useState(false)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsExt>()

    const loadDetails = async() => {
        try{
            if(!expand){
                const result = await axios.get(pokemon.url)
                setPokemonDetails(result.data)
            }
            setExpand(!expand)
        } catch(err:any){
            console.error(`Error Status : ${err.response.status}`);
            console.error(`Error Message: ${err.toJSON().message}`);
        }
    }



    return <>
    <Row onClick={loadDetails} className="card-title mb-0 text-uppercase">
        <Col>{pokemon.id}</Col>
        <Col>{pokemon.name}</Col>
        <Col>{pokemon.pokemonDetail.height}</Col>
        <Col>{pokemon.pokemonDetail.weight}</Col>
        <Col>{pokemon.pokemonDetail.experience}<span className="float-end">{expand ? <FaChevronDown/> : <FaChevronRight />}</span></Col>
    </Row>
    <Collapse in={expand}>
    <div className="text-capitalize pt-3">
    <Row>
        <Col>
            <u>ABILITES</u>
            {pokemonDetails?.abilities.map(ability => {
                return <div key={ability.ability.name}>{ability.ability.name}</div>
            })}
        </Col>
        <Col>
        <u>SPECIES</u>
        <div>{pokemonDetails?.species.name}</div>
        </Col>
    </Row>
    {/* <Row>
        <Col className="py-2">Species : {pokemonDetails?.species.name}</Col>
    </Row> */}
    </div>
    </Collapse>
    </>
}

export default Details