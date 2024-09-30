import React, { useEffect } from "react";
import { Dashboard } from "../components/dashboard";
import { UpdateDashboard } from "../components/updateDashboard";
import { Card } from "../components/userCard";
import axios from "axios";
import { BASE_URL } from "../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function UserDash(){
    const navigate=useNavigate()
    const {id}=useSelector((store)=>store.user)
    console.log("Dash page : ",id);
    const url=BASE_URL
    const [isUpdateDashboard,setIsUpdateDashboard]=React.useState(false)
    const [users,setUsers]=React.useState([])
    useEffect(()=>{
        if(!id) navigate('/')
        const getAllUsers=async()=>{
            try {
                const response=await axios.get(`${url}`,{
                    headers:{
                        "Content-Type":"body/json"
                    }
                })
                const users=response.data.users
                console.log(users)
                setUsers(users)
            } catch (error) {
                console.log(error);
                alert(error.response.data.message)
            }
        }
        getAllUsers()
    },[])
    return(
        <div className="mt-7 flex flex-col justify-center items-center">
            {isUpdateDashboard?<UpdateDashboard toggleDash={setIsUpdateDashboard} id={id}/>:<Dashboard toggleDash={setIsUpdateDashboard} id={id}/>}
            <div className="flex flex-col items-center justify-center mt-5">
                <span className="font-semibold text-xl text-violet-600">Other Users : </span>
                <div className="flex flex-wrap items-center justify-center mt-5">
                    {users.map((user)=>{
                        return <Card 
                            key={user.id} 
                            username={user.username} 
                            name={user.name} 
                            url={user.url} 
                            friends={user.friends}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}