import React, { useEffect, useState } from 'react'
import { Messages } from '../components/messaging'
import { SimpleGrid,Card,CardHeader,CardFooter,Heading, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { host, server_url } from '../routes'
import axios from 'axios'
import ChatOptions from '../components/chatOptions'

export default function ChatPage() {
  const {allUsers}=useSelector((store)=>store.users) 
  const navigate=useNavigate()
  const {info}=useSelector((store)=>store.user)
  const [chats,setChats]=useState([])
  const [selectedChat,setSelectedChat]=useState('')
  const [chatName,setChatName]=useState('')
  const [receiverId,setReceiverId]=useState('')
  //fetching chats
  useEffect(()=>{
    if(!info) navigate('/')
    else{
  
      const loadAllChats=async()=>{
        try {
          const response = await axios.get(`${host}/user/chats/${info._id}`,{
            headers:{
              "content-type":"application/json",
          },
          credentials:true
          })
          if(response.data.success){
            console.log("fetched chats:",response.data);          
            const {chats}=response.data
            setChats(chats)
          }
        } catch (error) {
          alert(error)
        }
      }
      loadAllChats()
  }
  },[])
  return (
    <div className='flex items-center overflow-hidden mt-10 ' style={{width:'80%',height:"80vh"}}>
      <div className='w-1/3 flex flex-col justify-start items-center  h-full bg-violet-600 rounded-l-xl '>
      <div className={`cursor-pointer w-fit h-10  bg-white text-violet-600'} font-semibold m-2 rounded-xl overflow-hidden flex justify-center items-center`}>
        <ChatOptions users={allUsers} userId={info._id} setChats={setChats} chats={chats}/>
      </div>
      {chats.map((chat,id)=>{
        const otherUsers = chat.users.filter(user => user._id !== info._id);
        return (
            <div className={`cursor-pointer w-auto p-2 h-10 ${selectedChat==chat._id?'bg-violet-600 text-white':'bg-white text-violet-600'} font-semibold m-2 rounded-xl overflow-x-hidden flex justify-center items-center`} key={id} onClick={()=>setSelectedChat(chat._id)}>
                {chat.name?<span onClick={()=>setChatName(chat.name)}>{chat.name}</span>:otherUsers.map(user => (
                    <span key={user._id} onClick={()=>{setChatName(user.username); setReceiverId(user._id);}}>{user.username || 'Loading...'}</span> // Show username or loading state
                ))}
            </div>
        );
      })}
      </div>
      <div className='w-2/3 h-full bg-white rounded-r-xl'>
          {info && <Messages info={info} chat={selectedChat} name={chatName} receiverId={receiverId}/>}
      </div>
    </div>
  )
}
