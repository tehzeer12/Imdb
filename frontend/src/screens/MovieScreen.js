import React, {useState, useEffect} from 'react';
import {Row,Col,Button,Image,ListGroup,Card,Form} from 'react-bootstrap'
import {useSelector}from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'

const MovieScreen=({match,history}  )=> {

     let val= match.params.id
    
    
     const userLogin = useSelector(state=>state.userLogin)
     const {userInfo} = userLogin

    // console.log("userInfo       ",userInfo._id)
    const [movie,setMovie] = useState([])
    const [state,setState] = useState(0)
    const [state2,setState2] = useState(0)
    const [state3,setState3] = useState(0)
    const [state4,setState4] = useState(0)
    const [comment,setComment] = useState('')
    const [reviews,setReviews]= useState([])
    const [rat,setRat]= useState([])
    const [rating,setRating] = useState('')
    const [avg,setAvg]= useState(0.0)
    
    
    useEffect(() => {
        if(state===0){
            async function getMovie(){
                
                console.log("state  ", val)
                const {data} =await axios.get(
                    `/api/movies/${val}`
                    )
                    setMovie(data)
                    console.log("idehr", data)
                    setState(1)
                }   
                getMovie()
            } 
            if(state2===0){
                async function getReviews(){
                    
                    const {data} =await axios.get(
                        `/api/reviews/${val}/`,
                        )
                        setReviews(data)
                        setState2(1)
                    }   
                    getReviews()
                   
                } 
                if(userInfo){
                if(state3 ===0 ){
                    async function getRating(){
                        
                        const configuration = {
                            headers : {
                                'Content-type':'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }
                        const {data} =await axios.get(
                            `/api/ratings/${val}/`,
                            configuration
                            )
                           
                            if(data === -1)
                            {   
                               console.log()
                               setState3(1)
                            }
                            else{
                              setRat(data)
                              setState3(1)
                                }
                            
                            setState3(1)
                            
                        }   
                        getRating()
                    }   
                }

                if(state4 === 0 ){
                    async function getAvg(){
                        
                        
                        const {data} =await axios.get(
                            `/api/ratings/average/${val}/`
                            )
                            setAvg(data)                            
                            setState4(1)
                            //console.log('Idher',data)
                        }   
                        getAvg()
                    } 
     }, [match,val,reviews,state2,state3,rat,rating,state4])

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
            await axios.post(
                `/api/reviews/add/`,
                {'movie_id':val,'comment':comment},
                configuration
                )
            }   
            postReview()
            setState2(0)
           
            
                    window.confirm("Review added successfully")
                setComment("")
        }
        else{
            history.push('/login')
        }
    }

    const rate =(e)=>{
        e.preventDefault()


        
        if(userInfo){
        async function postRate(){
            
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.post(
                `/api/ratings/add/`,
                {'movie_id':val,'rating':Number(rating)},
                configuration
                )
            }   
            postRate()
            setState3(0)
            setState4(0)
            
                    window.confirm("Rating added successfully")
                setRating("")
        }
        else{
            history.push('/login')
        }
    }


    const deleteReviewFunction=(id)=>{
        if(userInfo){
            async function deleteReview(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.delete(
                    `/api/reviews/delete/${id}/`,
                    configuration
                    )
                }   
                if(window.confirm("Are you sure you want to delete the user?"))
                {
                    deleteReview()
                }
                
                setState2(0)
               
            }
            else{
                history.push('/login')
            }
       
    }

    const deleteRatingFunction=(id)=>{
        if(userInfo){
            async function deleteRating(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.delete(
                    `/api/ratings/delete/${id}/`,
                    configuration
                    )
                }   
                if(window.confirm("Are you sure you want to delete the rating?"))
                {
                    deleteRating()
                   
                }
          
            setState3(0)
            setState4(0)
            setRat([])
            }
            else{
                history.push('/login')
            }
       
    }

    const add =()=>{
        if(userInfo){
            async function addToList(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.post(
                    `/api/lists/create/`,
                    {'movies':movie.name},
                    configuration
                    )
                }   
                addToList()
               
                history.push('/movies/list')
            }
            else{
                history.push('/login')
            }

    }

    return (
        <div>

            <Row>
                <Col>
                <Link to='/' className="btn btn-dark my-3">GO BACK</Link>
                </Col>
                
               
                
                <Col>
                    <Button className="btn btn-dark my-3"  type="submit" onClick={add}>
                        + Add this Movie to your List
                    </Button>
                </Col>
            </Row>
            
            
            
            <Row>
                <Col md={6}>
                    <Image src={movie.front_pic} alt={movie.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{movie.name}</h3>
                        </ListGroup.Item>
        

                        <ListGroup.Item>
                            Bio:{movie.bio}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Genre:{movie.genre}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                  <Card   >
                    <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col >
                                Release Date 
                            </Col>

                            <Col >
                                 <strong>{movie.release_date}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item> 

                    <ListGroup.Item>
                        <Row>
                        <Col >
                            Actors:                            
                        </Col>
                        
                        <Col >
                                 <strong>{movie.actors}</strong>
                        </Col>
                        
                        </Row>
                    </ListGroup.Item> 

                    <ListGroup.Item>
                        <Row>
                        <Col >
                            Movie Rating:                            
                        </Col>
                        
                        <Col >
                                 {
                                     avg===0 ?
                                     <strong>Not Rated Yet</strong>
                                     :
                                     <strong>{avg}</strong>
                                 }
                                 
                        </Col>
                        
                        </Row>
                    </ListGroup.Item> 

                    </ListGroup>    
                  </Card>

             </Col>
            </Row>

            <br></br>
            <br></br>
            <Row>
                <Col md={8}>
                    <h1> Reviews: </h1>
                </Col>
                
                <Col md={4}>
                {
                    userInfo &&(
                        <h2> Your Rating: </h2>
                    )
                }
              
                </Col>
            </Row>
            

            <Row>
                <Col md={8}>
                <Form onSubmit ={send}>  
                <Form.Control type="text" placeholder="Enter Review" value={comment}
          onChange = {(e)=>setComment(e.target.value)} />
                <br></br>
            <Button size="sm" variant="primary" type="submit">
                Submit Review
            </Button>
            </Form>
                </Col>
                
                <Col md={4}>
                {
                    userInfo &&(
                        rat.rating ?
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>
                                        Your Rating:
                                    </Col>

                                    <Col md={3}>
                                        <strong>{rat.rating}</strong>
                                    </Col>

                                    <Col md={2}>
                                    <LinkContainer style={{cursor:'pointer'}} to={`/edit/rating/${rat._id}/${rat.movie_id}`}>
                                    <i className='fas fa-edit' ></i>
                                    </LinkContainer>
                                    
                                    </Col>
                                    <Col md={2}>
                                    <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}}  onClick={()=>deleteRatingFunction(rat._id)}></i>
                                    </Col>
                                </Row>
                            </ListGroup.Item> 
                            </ListGroup>
                            :
                            <Form onSubmit ={rate}>  
                                    <Form.Control type="text" placeholder="Enter your rating out of 10" value={rating}
                                                onChange = {(e)=>setRating(e.target.value)} />
                                    <br></br>
                                <Button size="sm" variant="primary" type="submit">
                                    Rate
                                </Button>
                                </Form>
                    )
                }
                    
                </Col>
            </Row>

            
            <h3>Public Reviews</h3>

               <ListGroup>
                        
                        {
                            reviews &&(
                                reviews.map((val,ind)=>{
                                    return(
                                        <ListGroup.Item key={ind}>
                                        <Row>
                                            <Col md={6}>
                                                <strong>
                                                {val.comment}
                                                </strong>
                                            </Col>
                                            <Col md={2}>
                                                <strong>
                                                    By {val.name}
                                                </strong>
                                            </Col>

                                            <Col md={2}>
                                                {
                                                    userInfo&&(userInfo.isModerator===true || userInfo._id===val.user_id) &&(
                                                        <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}} onClick={()=>deleteReviewFunction(val._id)}></i>)
                                                }
                                            </Col>
                                            <Col md={2}>
                                                {
                                                    userInfo && userInfo._id===val.user_id && (
                                                        
                                                        <LinkContainer style={{cursor:'pointer'}} to={`/edit/review/${val._id}/${val.movie_id}`}>
                                                        <i className='fas fa-edit' ></i>
                                                        </LinkContainer>
                                                    )
                                                }
                                            </Col>

                                        </Row>
                                            
                                        </ListGroup.Item>
                                    )
                                })
                            )
                        }
                            
                        

                    </ListGroup>

            
            
        </div>
    )
}

export default MovieScreen
