import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUser} from '../actions/userActions'
// import axios from 'axios'
const LimitAccessScreen = ({history}) =>{
    const dispatch=useDispatch()    

    const userList = useSelector(state=>state.userList)
    const {loading,users,error} = userList
    //const [users,setUsers] = useState([])
    
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    
    

    useEffect(() => {
        if(userInfo && userInfo.isModerator){
           
            dispatch(listUser())
        }
        else{
            history.push('/login')
        }          
    }, [dispatch,history,userInfo])

    

    return (
    <div>
            <h2>SYSTEM ACTIVE USERS</h2>
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
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
                       
                        <th>
                            Edit System Access
                        </th>
                     
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && userInfo.isModerator &&users&& (
                        users.map(val=>
                        {
                            return (
                                val.isModerator === false && val.isActive === true && (<tr key={val._id}>
                                    <td>
                                        {val._id}                                        
                                    </td>

                                    <td>
                                        {val.name}                                        
                                    </td>
                                    <td>
                                        {val.email}                                        
                                    </td>

                                    <td>
                                    <LinkContainer style={{cursor:'pointer'}} to={`/moderator/user/${val._id}/edit/access`}>
                                    <i className='fas fa-edit' ></i>
                                    </LinkContainer>
                                        
                                    </td>
                                   

                                </tr>)
                                
                            )
                        }))
                    }
                </tbody>

            </Table>
            )}
            
    </div>
    )
}
export default LimitAccessScreen