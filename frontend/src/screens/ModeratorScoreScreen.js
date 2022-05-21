import React, {useEffect,useState} from 'react';
import {Table,Row,Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUser} from '../actions/userActions'
import axios from 'axios'
const ModeratorScoreScreen = ({history}) =>{
    const dispatch=useDispatch()    

    const userList = useSelector(state=>state.userList)
    const {loading,users,error} = userList
    //const [users,setUsers] = useState([])
    
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [scores,setScores] = useState([])
    
    

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
     
            dispatch(listUser())
            async function getScores(){
                
                const {data} =await axios.get(
                    `/api/moderatings/`,
                    )
                    setScores(data)
                }   
                getScores()
        }
        else{
            history.push('/login')
        }          
    }, [dispatch,history,userInfo])

    

    return (
        
    <div>
            <h2>Moderators Scores</h2>
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
                <div>
                <Row>
                    <Col md={10}>
                    <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            name
                        </th>
                        <th>
                            email
                        </th>                     
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && userInfo.isAdmin &&users&& (
                        users.map(val=>
                        {
                            return (
                                val.isAdmin === false && val.isModerator === true && (<tr key={val._id}>
                                    <td>
                                        {val._id}                                        
                                    </td>

                                    <td>
                                        {val.name}                                        
                                    </td>
                                    <td>
                                        {val.email}                                        
                                    </td>    
                                </tr>)
                                
                            )
                        }))
                    }
                 
                </tbody>

            </Table>
                    </Col>
                    <Col md={2}>
                    <Table striped bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>
                            Scores
                        </th>
                                          
                    </tr>
                </thead>

                    <tbody>
                        {
                            scores &&(
                                scores.map((value,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                {value.score}
                                            </td>
                                        </tr>
                                    )
                                })
                                )
                        }
                    </tbody>

                    </Table>
                    </Col>
                </Row>
           
            </div>
            )}
            
    </div>
    )
}
export default ModeratorScoreScreen