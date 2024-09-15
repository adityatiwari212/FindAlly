import React from "react";
import axios from 'axios'
import { BASE_URL } from "../store";

export function LoginForm({toggleSignup}){
    const url=BASE_URL
    const [credentials,setCredentials]=React.useState({username:"",password:""})
    const submmitForm=async(e)=>{
        e.preventDefault()
        console.log(credentials);
        try {
            const response=await axios.post(`${url}/login`,credentials,{
                headers:{
                    "content-type":"application/json",
                },
                credentials:true
            })
            const data=response.data
            alert(data.message)
            localStorage.token=data.token
            localStorage.user=data.user._id
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
        // setCredentials({username:"",password:""})
    }
    return(
        <div className="h-auto w-1/2 p-3 shadow-lg rounded-2xl border-2 border-s-2 border-violet-400 flex justify-center items-center">
            <div className="h-1/2 w-1/2">
                <img className="h-full w-full"  src="login.svg" alt="" />
            </div>
            <div className="h-full flex flex-col justify-center items-center">
                <span className="text-center font-bold text-violet-600 text-xl">Login to FindAlly</span>
                <p className="text-center text-slate-500 font-bold text-sm">Get to know people just like you!</p>
                <form className="h-1/2 mt-1 flex flex-col justify-evenly items-center ">
                    <input name="email" placeholder="Enter username" className="border-b-2 border-violet-400  w-3/4 focus:outline-none" type="text" onChange={(event)=>setCredentials({...credentials,username:event.target.value})}/>
                    <input name="password" placeholder="Enter Password" className="border-b-2 border-violet-400  w-3/4 focus:outline-none" type="password" onChange={(event)=>setCredentials({...credentials,password:event.target.value})}/>
                    <button className="bg-violet-600 text-white text-semibold w-20 h-9 mt-2 rounded-xl" onClick={submmitForm}>Log In</button>
                </form>
                <div className="mt-2 flex items-center justify-end px-2">
                    <span className="text-center text-slate-500 font-bold text-sm px-1">Don't have an account?</span>
                    <button className="bg-violet-600 text-white text-semibold w-20 h-9 mt-2 rounded-xl" onClick={()=>toggleSignup(true)} >Sign up</button>
                </div>
            </div>
        </div> 
    )
}