import React, { useEffect } from "react";
import { BASE_URL } from "../store";
import axios from "axios";

export function Dashboard({toggleDash,id}){
    const url=BASE_URL
    const [user,setUser]=React.useState({name:"",username:"",friends:"",requests:"",email:""})
    React.useEffect(()=>{   
        const fetchData=async()=>{            
            try{
                const response=await axios.get(`${url}/${id}`,{
                    headers:{
                        "content-type":"application/json"
                    }
                })
                setUser(response.data.user)           
            } catch (error) {
                console.log(error);
                alert(error.response.data.message)
            }
        }
        fetchData();
    },[id])
    let name=user.name
    name=name.split(' ')[0]
    name=name.charAt(0).toUpperCase()+name.slice(1)
    return(
        <div className="h-auto w-1/2 p-3 shadow-lg rounded-2xl border-4 border-s-2 border-violet-400 flex flex-col justify-center items-center">
            <span className="w-full font-bold text-xl text-violet-600 flex justify-start">{user.name}'s Dashboard</span>
            <div className="flex items-center justify-evenly p-5">
                <div className="w-1/4 h-1/2 mr-4 flex flex-col items-center justify-center">
                    {user.url?<img src={user.url} alt=""/>:<img src='user.png' alt=""/>}
                </div>
                    <ul className="flex flex-col">
                        <li className="font-semibold text-lg text-violet-600 mb-2">Friends : {user.friends}</li>
                        <li className="font-semibold  text-lg text-violet-600 mb-2">Friend Requests : {user.requests}</li>
                        <li className="p-1 font-semibold text-lg text-white bg-violet-600 rounded-lg cursor-pointer" onClick={()=>toggleDash(true)}>Update Credentials</li>
                    </ul>
            </div>
        </div>
    )
}