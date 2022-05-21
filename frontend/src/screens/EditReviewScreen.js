import React, {useState, useEffect} from 'react';
import {Row,Col,Button,Image,ListGroup,Card,Form} from 'react-bootstrap'
import {useSelector}from 'react-redux'

import axios from 'axios'

const EditReviewScreen=({match,history})=>{

    let val= match.params.id
    let movId = match.params.movId
    //console.log("khapp  ", movId)
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const [comment,setComment] = useState('')

    const send =(e)=>{
        e.preventDefault()

        if(userInfo){
        async function postReview(){
            
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.put(
                `/api/reviews/edit/${val}/`,
                {'comment':comment},
                configuration
                )
            }   
            postReview()           
                window.confirm("Review added successfully")
                history.push(`/movie/${movId}`)
        }
        else{
            history.push('/login')
        }
    }

    return (
        <div>
            <Form onSubmit ={send}>  
                <Form.Control type="text" placeholder="Enter Review" value={comment}
          onChange = {(e)=>setComment(e.target.value)} />
                <br></br>
            <Button size="sm" variant="primary" type="submit">
                Submit Review
            </Button>
            </Form>
        </div>
    )

}
export default EditReviewScreen