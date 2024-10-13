import React, { useEffect } from "react";
import { Dashboard } from "../components/dashboard";
import { UpdateDashboard } from "../components/updateDashboard";
import { Card } from "../components/userCard";
import axios from "axios";
import { BASE_URL } from "../store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UsersActions } from "../../redux/usersSlice";
import { Messages } from "../components/messaging";
import Sidebar from "../components/sidebar";

export function UserDash(){
    const navigate=useNavigate()   
    const url=BASE_URL
    const [isUpdateDashboard,setIsUpdateDashboard]=React.useState(false)
    const [users,setUsers]=React.useState([])
    const dispatch=useDispatch()
    const {info}=useSelector((store)=>store.user)   

    useEffect(()=>{
        if(!info) navigate('/')
        const getAllUsers=async()=>{
            try {
                const response=await axios.get(`${url}`,{
                    headers:{
                        "Content-Type":"body/json"
                    }
                })
                const users=response.data.users
                setUsers(users)
                dispatch(UsersActions.addUsers(users))
            } catch (error) {
                console.log(error);
                alert(error)
            }
        }
        getAllUsers()
    },[])
    if(!info) return null
    return(
        <div className="flex mt-20 flex-col justify-center items-center max-w-screen">
            {isUpdateDashboard?<UpdateDashboard toggleDash={setIsUpdateDashboard} info={info}/>:<Dashboard toggleDash={setIsUpdateDashboard} info={info}/>}
            <div className="flex flex-col items-center justify-center mt-5">
                <span className="font-semibold text-xl text-violet-600">Other Users : </span>
                <div className="flex flex-wrap items-center justify-center mt-5">
                    {users.map((user,id)=>{
                        return <Card 
                            key={user._id} 
                            username={user.username} 
                            name={user.name} 
                            url={user.url} 
                            friends={user.friends}
                            id={id}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}