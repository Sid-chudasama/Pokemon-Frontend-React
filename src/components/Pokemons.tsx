import { SetStateAction, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { Pokemon } from '../models/Pokemon'
import Details from './Details'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/esm/Row'
import { Col } from 'react-bootstrap'
import { OrderBy, SortField } from '../models/Enums'
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa'

const Pokemons = () => {
    const api = "https://localhost:7136/Pokemon/Search"
    const [searchResult, setsearchResult] = useState(new Array<Pokemon>())
    const[hasMore, setHasMore] = useState(true)
    const[page, setPage] = useState(1)
    const pageSize = 20
    const[query, setQuery] = useState("")
    const[sortField, setSortField] = useState(SortField.Id)
    const[orderBy, setOrderBy] = useState(OrderBy.Asc)

    const fetchData = async() => {
        try{
        const result = await axios.get(`${api}?Query=${query}&SortField=${sortField}&OrderBy=${orderBy}&Page=${page}&PageSize=${pageSize}`)
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
    },[query, sortField, orderBy])

    function handleSearch(e: { target: { value: SetStateAction<string> } }){
        setPage(1)
        setQuery(e.target.value)
    }

    function sortAndOrder(sort: SortField){
        setPage(1)
        if(sort == sortField){
            orderBy == OrderBy.Asc ? setOrderBy(OrderBy.Desc) : setOrderBy(OrderBy.Asc)
        }
        else{
            setSortField(sort)
            setOrderBy(OrderBy.Asc)
        }
    }

    return <>
    <div>
    <Container fluid className="col-md-7 text-center pt-1">
            <Form.Control type='text' placeholder='Search Pokemon' onChange={handleSearch} className='my-5 shadow-lg form-control-lg'></Form.Control>
            <Row className='my-4 mx-5 sticky-top bg-white border border-dark shadow-lg p-2'>
                <Col onClick={() => sortAndOrder(SortField.Id)} role="button">
                    ID 
                    {
                        sortField === SortField.Id && orderBy == OrderBy.Asc ? <FaSortAmountUpAlt/> :
                        (sortField === SortField.Id && orderBy == OrderBy.Desc ? <FaSortAmountDown/> : '')
                    }
                </Col>
                <Col onClick={() => sortAndOrder(SortField.Name)} role="button">
                    NAME
                    {
                        sortField === SortField.Name && orderBy == OrderBy.Asc ? <FaSortAmountUpAlt/> :
                        (sortField === SortField.Name && orderBy == OrderBy.Desc ? <FaSortAmountDown/> : '')
                    }
                </Col>
                <Col  onClick={() => sortAndOrder(SortField.Height)} role="button">
                    HEIGHT
                    {
                        sortField === SortField.Height && orderBy == OrderBy.Asc ? <FaSortAmountUpAlt/> :
                        (sortField === SortField.Height && orderBy == OrderBy.Desc ? <FaSortAmountDown/> : '')
                    }
                </Col>
                <Col  onClick={() => sortAndOrder(SortField.Weight)} role="button">
                    WEIGHT
                    {
                        sortField === SortField.Weight && orderBy == OrderBy.Asc ? <FaSortAmountUpAlt/> :
                        (sortField === SortField.Weight && orderBy == OrderBy.Desc ? <FaSortAmountDown/> : '')
                    }
                </Col>
                <Col  onClick={() => sortAndOrder(SortField.Experience)} role="button">
                    EXPERIENCE
                    {
                        sortField === SortField.Experience && orderBy == OrderBy.Asc ? <FaSortAmountUpAlt/> :
                        (sortField === SortField.Experience && orderBy == OrderBy.Desc ? <FaSortAmountDown/> : '')
                    }
                </Col>
            </Row>
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