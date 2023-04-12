import axios from "axios"
import { useState } from "react"
import { Pokemon, PokemonDetails } from "../models/Pokemon"
import Collapse from "react-bootstrap/esm/Collapse"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

type DetailsProps = {pokemon: Pokemon}
const Details = ({pokemon}: DetailsProps) => {
    const [expand, setExpand] = useState(false)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()

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
    <h4 className="card-title mb-0 text-uppercase" onClick={loadDetails}><u className="float-start">{pokemon.name}</u><span className="float-end">{expand ? <FaChevronDown/> : <FaChevronRight />}</span></h4>
    <Collapse in={expand}>
    <div className="text-capitalize pt-3">
    <Row>
        <Col className="py-2">Height : {pokemonDetails?.height}</Col>
        <Col className="py-2">Weight : {pokemonDetails?.weight}</Col>
    </Row>
    <Row>
        <Col>
            <u>ABILITES</u>
            {pokemonDetails?.abilities.map(ability => {
                return <div key={ability.ability.name}>{ability.ability.name}</div>
            })}
        </Col>
    </Row>
    <Row>
        <Col className="py-2">Base Experience : {pokemonDetails?.base_experience}</Col>
        <Col className="py-2">Species : {pokemonDetails?.species.name}</Col>
    </Row>
    </div>
    </Collapse>
    </>
}

export default Details