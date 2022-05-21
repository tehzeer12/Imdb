import React, {useState, useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {detailedUser,updatedUser} from '../actions/userActions'

import {USER_UPDATE_RESET} from '../constants/userConstants'

const ProfileScreen = ({history}) =>{
    const dispatch=useDispatch()
    
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
   
    

    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading, user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state=>state.userUpdate)
    const {success} = userUpdate

    useEffect(() => {

            if(!userInfo)
            {
                history.push('/login')
            }
            else
            {
                if(!user || !user.name ||success || userInfo._id !== user._id)
                {
                    dispatch({type: USER_UPDATE_RESET})
                    dispatch(detailedUser())
                }
                 else{
                     setName(user.name)
                     setEmail(user.email)
                 }
            }       
    }, [dispatch,history,userInfo,user,success])

    const send =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage('PassWords Did Not Match')
        }
        else
        {
        dispatch(updatedUser(name,email,password))
        setMessage('')
        }
    }


    return (
    <div>
        {message && <Message variant = 'dark' >{message}</Message>}
    <Row>
    <Col md={2}>

    </Col>
        <Col md={8}>

          <h2>User Profile</h2>
          {error && <Message variant='dark'> {error} </Message>}
          {loading && <Loader/>}
          <Form onSubmit={send}>
                    <Form.Group className="mb-3" controlId="text">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"  placeholder="Enter your full name" value={name}
                        onChange = {(e)=>setName(e.target.value)}
                    />
                    
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email"  placeholder="Enter email" value={email}
                        onChange = {(e)=>setEmail(e.target.value)}
                    />
                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password}
                    onChange = {(e)=>setPassword(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Your Password" value={confirmPassword}
                        onChange = {(e)=>setConfirmPassword(e.target.value)}  />
                    </Form.Group>
                                
                                <Button variant="primary" type="submit">
                                Update
                                </Button>
              </Form>
            </Col> 
            <Col md={2}></Col>
            </Row>
    </div>
    )
}
export default ProfileScreen