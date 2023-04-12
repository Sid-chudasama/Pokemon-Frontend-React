import { SetStateAction, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { Pokemon } from '../models/Pokemon'
import Details from './Details'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/esm/Row'
import { Col } from 'react-bootstrap'

const Pokemons = () => {
    const api = "https://localhost:7136/Pokemon/Search"
    const [searchResult, setsearchResult] = useState(new Array<Pokemon>())
    const[hasMore, setHasMore] = useState(true)
    const[page, setPage] = useState(1)
    const pageSize = 20
    const[query, setQuery] = useState("")

    const fetchData = async() => {
        try{
        const result = await axios.get(`${api}?Query=${query}&Page=${page}&PageSize=${pageSize}`)
        setsearchResult(prev => {
            return[...prev, ...result.data.pokemons]
        })
        setHasMore(page*pageSize < result.data.recordCount)
        setPage(page+1)
        } catch(err:any){
            console.error(`Error Status : ${err.response.status}`);
            console.error(`Error Message: ${err.toJSON().message}`);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(()=>{
        let timeout = setTimeout(() => {
            setsearchResult(new Array<Pokemon>())
            fetchData();
        }, 500)
        return () => clearTimeout(timeout)
    },[query])

    function handleSearch(e: { target: { value: SetStateAction<string> } }){
        setPage(1)
        setQuery(e.target.value)
    }

    return <>
    <div>
    <Container fluid className="col-md-6 text-center pt-1">
            <Form.Control type='text' placeholder='Search Pokemon' onChange={handleSearch} className='my-5 shadow-lg form-control-lg'></Form.Control>
            <InfiniteScroll
                className='border border-dark shadow-lg rounded'
                dataLength={page * pageSize}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>
                    {searchResult.length > 0 ?
                    <b>You've Caught'em All !</b> :
                    <b>No matching records found</b>}
                </p>}
            >
                {searchResult.map((pokemon) =>{
                    return(
                    <Row className='my-4 mx-5' key={pokemon.id}>
                        <Col key={pokemon.id} className='card py-3 card-bg bg-secondary bg-gradient text-light' role="button">
                            <Details pokemon={pokemon}></Details>
                        </Col>
                    </Row>
                    )
                })}
            </InfiniteScroll>
    </Container>
    </div>
    </>
}

export default Pokemons