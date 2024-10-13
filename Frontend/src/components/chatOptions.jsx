import React, { useState } from 'react'
import UserOptions from './userOptions'
import axios from 'axios'
import { host } from '../routes'

export default function ChatOptions({users,userId,setChats,chats}) {
  const [selectedUsers,setSelectedUsers]=useState([])
  const [groupName,setGroupName]=useState("")
  const createChat=async()=>{
      const chatType=selectedUsers.length>1?"group":"personal";
      if(selectedUsers.length>1 && groupName==""){alert("Enter Group Name for Group Chat"); return;}
      try {
        console.log(selectedUsers);        
        const response=await axios.post(`${host}/user/chats`,{users:[...selectedUsers,userId],chatType,name:groupName},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        console.log(response.data);  
        setChats([...chats,response.data.populatedChat])
        document.getElementById('my_modal_3').close();
      } catch (error) {
        alert(error.response.data.message)
      }
      setGroupName("")
      setSelectedUsers([])
  }
  return (
    <div>
      <button className="btn text-violet-600 font-bold bg-white w-full" onClick={()=>document.getElementById('my_modal_3').showModal()}>Create New Chat</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-violet-600 mb-2">Choose from a variety of user(s)!</h3>
            <div className='flex flex-col '>
            {users.map((user,id)=>{ if(user._id!=userId) return(<UserOptions id={user._id} username={user.username} pfp={user.url} key={id} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>)})}
            </div>
            <input type="text" value={groupName || ""} placeholder="Enter Chat Name" className="input input-bordered w-full max-w-xs mx-2" onChange={(e)=>setGroupName(e.target.value)}/>
            <button className='bg-violet-600 text-white font-semibold p-1 rounded-lg' onClick={createChat}>Create Chat</button>
        </div>
        </dialog>
    </div>
  )
}
