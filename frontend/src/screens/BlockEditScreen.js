import React, { useEffect} from 'react';
import {Container,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


import axios from 'axios'
const BlockEditScreen = ({match,history}) =>{
    const userId = match.params.id

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

  
   
    useEffect(() => {
       if(userInfo){

       }
       else{
           history.push('/login')
       }

        }, [history,userInfo])

    const send =()=>{
       
        console.log("aaya")
        if(userInfo){
            async function unBlockUser(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.put(
                    `/api/users/unblock/${userId}/`,
                    {},
                    configuration
                    )
                }   
                unBlockUser()   
                history.push('/moderator/blocklist')              
            }
            else{
                history.push('/login')
            }

    }
    return (

        <div>
        
          
        
          <Link to={'/moderator/blocklist'}>
            Go Back
          </Link>

        <h1 style={{ textAlign:'center'}}>Un Block User</h1>
        <Container className="d-flex justify-content-center">
        

       
        
        <Button variant="primary" type="submit" onClick={send}>
            Tap to Un Block The User
        </Button>
        </Container>        
       </div>
       
          )
}

export default BlockEditScreen