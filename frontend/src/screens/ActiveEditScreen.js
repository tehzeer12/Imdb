import React, {useState, useEffect} from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


import axios from 'axios'
const ActiveEditScreen = ({match,history}) =>{
    const userId = match.params.id

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

  
    const [block,setBlock] = useState(false)
    
   
    useEffect(() => {
       if(userInfo){

       }
       else{
           history.push('/login')
       }

        }, [history,userInfo])

    const send =(e)=>{
        e.preventDefault()
        if(userInfo){
            async function blockUser(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.put(
                    `/api/users/block/${userId}/`,
                    {'block':block},
                    configuration
                    )
                }   
                blockUser()   
                history.push('/moderator/limitaccess')              
            }
            else{
                history.push('/login')
            }

    }
    return (

        <div>
        
          
        
          <Link to={'/moderator/limitaccess'}>
            Go Back
          </Link>

        <h1 style={{ textAlign:'center'}}>Block User</h1>
        <Container className="d-flex justify-content-center">
        <Form onSubmit ={send}>
        
        <Form.Group className="mb-3" controlId="block">
          <Form.Check  type="checkbox" checked={true} 
             onChange = {(e)=>setBlock(e.target.checked)} 
           />  
        </Form.Group>

       
        
        <Button variant="primary" type="submit">
            Tap to Block
        </Button>
       </Form>
        </Container>        
       </div>
       
          )
}

export default ActiveEditScreen