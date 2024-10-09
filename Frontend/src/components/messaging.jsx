import { Box } from "@chakra-ui/react";
import socket  from "../App";
import { useEffect,useState } from "react";
import { IoIosSend } from "react-icons/io";

export function Messages({user,receiver}){    
    return(
       <div className="relative h-full w-full flex flex-col items-center justify-end">
        <div className="w-full h-10 border-b-2 border-violet-600 absolute top-0">
            User1
        </div>
        <div className='h-10 relative mb-2 flex p-1 items-center bg-white border-2 border-violet-600 rounded-xl text-center' style={{width:'90%'}}>
            <input className="h-full border-none focus:outline-none" placeholder=" Send Message" style={{width:'95%'}}></input>
            <IoIosSend className="cursor-pointer"/>
        </div>
       </div>
    )
}