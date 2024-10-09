import React from "react";
import { BASE_URL } from "../store";
import axios from 'axios'

export function SignupForm({toggleSignup}){
    const url=BASE_URL
    const [userDetails,setUserDetails]=React.useState({name:"",username:"",email:"",password:""})
    const handleSignup=async(e)=>{
        e.preventDefault()
        try {
            console.log(url);
            console.log(userDetails);            
            const data=await axios.post(`${url}/signup`,userDetails,{
                headers:{'Content-type':'application/json'},
                withCredentials:true
            })
            console.log(data.user)
            alert("User created")
            toggleSignup(false)
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
            setUserDetails({username:"",password:"",email:"",name:""})
        }
    }
    return(
        <div className="h-auto w-1/2 p-3 shadow-lg rounded-2xl border-2 border-s-2 border-violet-400 flex justify-center items-center">
            <div className="flex h-full w-1/2">
                <img className="h-full w-full obect-cover"  src="login.svg" alt="" />
            </div>
            <div className="h-full flex flex-col justify-center items-center">
                <span className="text-center font-bold text-violet-600 text-xl">Sign up to FindAlly!</span>
                <p className="text-center text-slate-500 font-bold text-sm">Get to know people just like you!</p>
                <form className="h-1/2 mt-1 flex flex-col justify-evenly items-center ">
                    <input value={userDetails.name} name="name" placeholder="Enter full name" className="border-b-2 border-violet-400 w-3/4 focus:outline-none" type="text" onChange={(event)=>setUserDetails({...userDetails,name:event.target.value})}/>
                    <input value={userDetails.username} name="username" placeholder="Enter Username" className="border-b-2 border-violet-400 w-3/4 focus:outline-none" type="text" onChange={(event)=>setUserDetails({...userDetails,username:event.target.value})} />
                    <input value={userDetails.email} name="email" placeholder="Enter email" className="border-b-2 border-violet-400  w-3/4 focus:outline-none" type="email" onChange={(event)=>setUserDetails({...userDetails,email:event.target.value})}/>
                    <input value={userDetails.password} name="password" placeholder="Enter Password" className="border-b-2 border-violet-400  w-3/4 focus:outline-none" type="password" onChange={(event)=>setUserDetails({...userDetails,password:event.target.value})}/>
                    <button className="bg-violet-600 text-white text-semibold w-20 h-9 mt-2 rounded-xl" onClick={handleSignup}>Sign Up</button>
                </form>
                <div className="mt-2 flex items-center justify-end px-2">
                    <span className="text-center text-slate-500 font-bold text-sm px-1">Already have an account?</span>
                    <button className="bg-violet-600 text-white text-semibold w-20 h-9 mt-2 rounded-xl" onClick={()=>toggleSignup(false)} >Login</button>
                </div>
            </div>
        </div> 
    )
}