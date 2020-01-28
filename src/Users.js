import React, {useState, useEffect} from 'react';
import qs from 'qs';
import axios from 'axios';
const api = 'https://acme-users-api-rev.herokuapp.com';
const store = window.localStorage;

const Users = ({userList, setUserList, param} ) => {

    const addUser = () => {
        axios.get(`${api}/api/users/random`)
             .then( (res) => {
                    setUserList([res.data, ...userList]);
                    store.setItem('userList',JSON.stringify([res.data, ...userList]));
                })
             .catch((er)=> console.log(er))
    }

    const deleteUser = (deleteId) => {
        const newList = userList.filter( user => user.id !== deleteId );
        setUserList(newList);
        store.setItem('userList', JSON.stringify(newList));
    }

    useEffect( () => {
        const existingUsers = JSON.parse(store.getItem('userList'));
        setUserList([...existingUsers]);
    },[])
  
    return (
        <div>
            <div>Current User List</div>
            <button 
                disabled = {userList.length > 4 ? true : false}
                onClick = {() => addUser()}> 
                {userList.length > 4 ? 'Only 5 Users Allowed' : 'Add New User'}
            </button>
            
            <div className = 'list'>
                {
                    userList.map( user => {
                        return (
                            <div key = {user.id} className = 'card'>
                                <div className = 'card-left'>
                                    <div> {user.fullName} </div>
                                    <img className = 'avatar' src = {user.avatar} />
                                    
                                    <button onClick = {() => {
                                        window.location.hash = 
                                            param.id === user.id ? 'view=users' :
                                            qs.stringify({ view: 'users', id: user.id, profile: false })
                                        }}> 
                                        {param.id === user.id ? 'Hide Profile' : 'View Profile'}
                                    </button>
                                    <button onClick = {()=>console.log('TBD')}> 
                                        View Calendar
                                    </button>
                                    <button onClick = {()=>deleteUser(user.id)}> 
                                        Delete User
                                    </button>
                                </div>
                                <div className = 'card-right'>
                                    <div className = 'title'>{user.title}</div>
                                    {param.id === user.id && (param.profile && <h3> {user.title}</h3>)}
                                    {param.id === user.id && <div> {user.email}</div>}
                                    
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Users;