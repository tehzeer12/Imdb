import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,


    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,

    USER_MODIFY_REQUEST,
    USER_MODIFY_SUCCESS,
    USER_MODIFY_FAIL,
    USER_MODIFY_RESET,


} 
from '../constants/userConstants';


import axios from 'axios'

export const loginUser =(email,password) => async (dispatch)=>{

    try{
    dispatch({
        type:USER_LOGIN_REQUEST
    })

    const configuration = {
        headers : {
            'Content-type':'application/json'
        }
    }

    const {data} =await axios.post(
        '/api/users/login/',
        {'username': email, 'password':password},
        configuration
        )

    dispatch({
              type:USER_LOGIN_SUCCESS,
              payload:data
            })

              localStorage.setItem('userInfo', JSON.stringify(data))
        }
        catch(error)
        {   
            dispatch({type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}

export const logoutUser =()=>  (dispatch)=>{
        localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
      })
    dispatch({
        type:USER_DETAILS_RESET
      })   
      
    dispatch({
        type:USER_LIST_RESET
      })
    dispatch({
        type:USER_MODIFY_RESET
      })   
}

export const registerUser =(name,email,password) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_REGISTER_REQUEST
    })

    const configuration = {
        headers : {
            'Content-type':'application/json'
        }
    }


    const {data} =await axios.post(
        '/api/users/register/',
        {'name':name,'email': email, 'password':password},
        configuration
        )

    dispatch({
              type:USER_REGISTER_SUCCESS,
              payload:data
            })
    
    // dispatch({
    //             type:USER_LOGIN_SUCCESS,
    //             payload:data
    //           })

              //localStorage.setItem('userInfo', JSON.stringify(data))
        }
        catch(error)
        {   
            dispatch({type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}


export const detailedUser =() => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_DETAILS_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.get(
        '/api/users/profile/',
        configuration
        )

    dispatch({
              type:USER_DETAILS_SUCCESS,
              payload:data
            })
   
            
        }
        catch(error)
        {   
            dispatch({type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}


export const updatedUser =(name,email,password) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_UPDATE_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.put(
        '/api/users/profile/update/',
        {'name':name,'email': email, 'password':password},
        configuration
        )

    dispatch({
              type:USER_UPDATE_SUCCESS,
              payload:data
            })
    dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
              })        
   
    localStorage.setItem('userInfo', JSON.stringify(data))       
        }
        catch(error)
        {   
            dispatch({type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}

export const listUser =() => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_LIST_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.get(
        '/api/users/',
        configuration
        )

    dispatch({
              type:USER_LIST_SUCCESS,
              payload:data
            })    
        }
        catch(error)
        {   
            dispatch({type:USER_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}


export const userDeleted =(id) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_DELETE_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.delete(
        `/api/users/delete/${id}/`,
        configuration
        )

    dispatch({
              type:USER_DELETE_SUCCESS,
              payload:data
            })    
        }
        catch(error)
        {   
            dispatch({type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}

export const getUser =(id) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_GET_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.get(
        `/api/users/${id}/`,
        configuration
        )

    dispatch({
              type:USER_GET_SUCCESS,
              payload:data
            })    
        }
        catch(error)
        {   
            dispatch({type:USER_GET_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}

export const modifyUser =(id,name,email,admin) => async (dispatch,getState)=>{

    try{
    dispatch({
        type:USER_MODIFY_REQUEST
    })

    const {
            userLogin :{userInfo} ,
    } = getState()

    const configuration = {
        headers : {
            'Content-type':'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} =await axios.put(
        `/api/users/update/${id}/`,
        {'name':name,'email': email, 'is_Admin':admin},
        configuration
        )

    dispatch({
              type:USER_MODIFY_SUCCESS,
            })
    
    dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:data
        })            
        }
        catch(error)
        {   
            dispatch({type:USER_MODIFY_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
        }
}

