import React, { useEffect } from "react";
import { BASE_URL } from "../store";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export function UpdateDashboard({toggleDash,id}){
    const navigate=useNavigate()
    const url=BASE_URL
    const[image,setImage]=React.useState("")
    const[preview,setPreview]=React.useState("")
    const [user,setUser]=React.useState({name:"",username:"",friends:"",requests:"",email:"",dob:{day:"",month:"",year:""},url:""})
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
        setPreview(user.url)
    },[id])
    const handlePfp=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader()
        reader.onload = () => {
            setImage(file);
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleUpdate=async(e)=>{
        try {
            e.preventDefault()
            const form=new FormData()
            form.append('email',user.email)
            form.append('name',user.name)
            form.append('username',user.username)
            form.append('image',image)
            const response=await axios.put(`${url}/${id}`,form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            const data=response.data
            console.log(data);
            toggleDash(false)
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }
    let name=user.name
    name=name.split(' ')[0]
    name=name.charAt(0).toUpperCase()+name.slice(1)
    return(
        <div className="h-auto w-1/2 p-3 shadow-lg rounded-2xl border-4 border-s-2 border-violet-400 flex flex-col justify-center items-center">
            <span className="w-full font-bold text-xl text-violet-600 flex justify-start">{user.name}'s Dashboard</span>
            <div className="flex items-center justify-evenly p-5">
                <div className="w-1/4 mr-4 flex flex-col items-center justify-center">
                    <img src={preview} alt="" />
                    <label className="mt-4 border-2 border-violet-400 text-center rounded-lg font-semibold text-violet-600 p-2 cursor-pointer" htmlFor="fileInput" >Upload PFP</label>
                    <input id="fileInput" className="hidden border-violet-400" type="file" placeholder="Upload PFP" onChange={handlePfp}/>    
                </div>
                <form className="h-1/2 mt-1 flex flex-col justify-evenly items-center ">
                    <input value={user.name} name="name" placeholder="Enter full name" className="border-b-2 border-violet-400 w-3/4 focus:outline-none" type="text" onChange={(event)=>setUser({...user,name:event.target.value})}/>
                    <input value={user.username} name="username" placeholder="Enter Username" className="border-b-2 border-violet-400 w-3/4 focus:outline-none" type="text" onChange={(event)=>setUser({...user,username:event.target.value})} />
                    <input value={user.email} name="email" placeholder="Enter email" className="border-b-2 border-violet-400  w-3/4 focus:outline-none" type="email" onChange={(event)=>setUser({...user,email:event.target.value})}/>
                    <button className="bg-violet-600 text-white text-semibold w-20 h-9 mt-2 rounded-xl" onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </div>
    )
}