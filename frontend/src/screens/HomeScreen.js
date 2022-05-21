import React, { useState,useEffect} from 'react';
import {Row,Col, Button} from 'react-bootstrap';
import Product from '../components/Product';
import {useDispatch, useSelector}from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import axios from 'axios'

const HomseScreen=()=>{
   
   
    const [movies,setMovies] = useState([])
    const [state,setState] = useState(0)
    const [next,setNext] = useState(10)
    useEffect(() => {
       
            if(state===0){
            async function Movieslist(){
                
                const {data} =await axios.get(
                    `/api/movies/page/${next}`,
                    )
                    setMovies(data)
                    setState(1)
                }   
                Movieslist()
            }
                
    }, [state,movies,next])
    // const productList=useSelector(state=>state.productList)
    // const {error,loading,products}=productList

     
    // useEffect(() => {
    
    //     dispatch(listProducts())
        
    // }, [dispatch])
    const increment= () =>{
        // let temp = next
        // temp = temp+10
        setNext((next+10))
        console.log("value  ",next)
        setState(0)
    }

    const decrement= () =>{
        // let temp = next
        // temp = temp+10
        setNext((next-10))
        console.log("value  ",next)
        setState(0)
    }

    return(
        <div>
        <h1>LATEST Movies</h1>
        

        <Row>
            { 
                movies&&(  
            movies.map(val=>(
                
                <Col key={val._id} sm={12} md={6} lg={4} xl={3}>
                
                 <Product val={val}/>
                </Col>
            )))}
            </Row>
            <Button onClick={increment} variant='danger'>
                    Next
            </Button>
            <br></br>
            <br></br>
            {
                next >= 20 &&(
                <Button onClick={decrement} variant='success'>
                        previous
                </Button>
                )
            }
        </div>
    )
}

export default HomseScreen;