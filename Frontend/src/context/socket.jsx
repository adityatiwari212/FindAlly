import io from 'socket.io-client'
import {useEffect, createContext, useContext, useRef, Children, useState} from 'react'
import { server_url } from '../routes'
import { useSelector } from 'react-redux'

const socketContext = createContext(null)

export const useSocket=()=>{
    return useContext(socketContext)
}

export const SocketProvider=({children})=>{
    const socket=useRef()
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const {info}=useSelector((store)=>store.user)
        useEffect(()=>{
            const userid=info?info._id:null
                socket.current= io(server_url,{
                    withCredentials:true,
                    query:{userid},
                    reconnection:true
                })
                //connection
                socket.current.on("connect",()=>{
                    console.log("Connected to server");   
                    setIsSocketConnected(true);      
                })
                //clear function
                return ()=>{
                    socket.current.disconnect()
                    console.log("Socket disconnected");            
                }
        },[info])
    if (!isSocketConnected) {
        return <div>Loading socket connection...</div>;
    }
    return(
        <socketContext.Provider value={socket.current}>
            {children}
        </socketContext.Provider>
    )
}

