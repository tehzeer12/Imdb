import React, {useEffect,useState} from 'react';
import {ListGroup,Table,Row,Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUser} from '../actions/userActions'
import axios from 'axios'
const ListScreen = ({history}) =>{
    const dispatch=useDispatch()    

    
    //const [users,setUsers] = useState([])
    
    //states
    const [state,setState] = useState(0)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [mov,setMov] = useState([])
    
    

    useEffect(() => {
        if(userInfo){
     
        try {
            if(state!=1)
            {
            async function getList(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const {data} =await axios.get(
                    `/api/lists/${userInfo._id}/`,
                    configuration
                    )
                    
                    setMov(data)
                    setState(1)
                }  
                getList()
            }
            }
            catch(err){
                setMov([])
            }
        }
        else{
            history.push('/login')
        }          
    }, [dispatch,history,userInfo,mov])

    const deleteListFunction = (id) =>
    {

        if(userInfo){
            async function deleteList(){
                
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.delete(
                    `/api/lists/delete/${id}/`,
                    configuration
                    )
                }   
                if(window.confirm("Are you sure you want to delete the list?"))
                {
                    deleteList()
                   
                }
                history.push('/login')
            }
            else{
                history.push('/login')
            }
    }

    return (
        
    <div>
            <h2>Your List</h2>
            
            <ListGroup>

                <ListGroup.Item style={{cursor:"pointer"}}>
                    <h3>Movies</h3>
                </ListGroup.Item>
                    <br></br>
                <ListGroup.Item>
                    {mov!==[] && mov.movies && (<h3>{mov.movies}</h3>)}
                </ListGroup.Item>
                    <br></br>
                <ListGroup.Item>
                {   mov !== [] && mov.movies && (
                    <Row>
                    <Col>
                            Delete List
                        </Col>
                        <Col>
                        <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}} onClick={()=>deleteListFunction(userInfo._id)}></i>
                        </Col>
                    </Row>
                )                        
                }
                </ListGroup.Item>
            </ListGroup>
    </div>
    )
}
export default ListScreen