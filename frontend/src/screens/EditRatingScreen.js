import React, {useState, useEffect} from 'react';
import {Row,Col,Button,Image,ListGroup,Card,Form} from 'react-bootstrap'
import {useSelector}from 'react-redux'

import axios from 'axios'

const EditRatingScreen=({match,history})=>{

    let val= match.params.id
    let movId = match.params.movId
    //console.log("khapp  ", movId)
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const [rating,setRating] = useState('')

    const send =(e)=>{
        e.preventDefault()

        if(userInfo){
        async function postRating(){
            
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.put(
                `/api/ratings/edit/${val}/`,
                {'rating':Number(rating)},
                configuration
                )
            }   
            postRating()           
                window.confirm("Rating added successfully")
                history.push(`/movie/${movId}`)
        }
        else{
            history.push('/login')
        }
    }

    return (
        <div>
            <Form onSubmit ={send}>  
                <Form.Control type="text" placeholder="Enter your update Rating (out of 10)" value={rating}
          onChange = {(e)=>setRating(e.target.value)} />
                <br></br>
            <Button size="sm" variant="primary" type="submit">
                Edit Rating
            </Button>
            </Form>
        </div>
    )

}
export default EditRatingScreen