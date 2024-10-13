import React from 'react'

export default function UserOptions({username,pfp,setSelectedUsers,selectedUsers,id}) {
    const toggleUser=()=>{
        setSelectedUsers((selectedUsers)=>{if(selectedUsers.includes(id)){
            return selectedUsers.filter(user=>user!==id)
        }
        else return [...selectedUsers,id]
    })}  
  return (
    <div className='bg-violet-600 w-full h-16 rounded-xl flex justify-between p-2 text-white items-center overflow-hidden mb-2'>
      <img className='w-10 h-10 rounded-full' src={pfp===""?'#':pfp} alt="" />
      {username}
      <input type="checkbox" checked={selectedUsers.includes(id)} className="checkbox cursor-pointer border-white" onChange={toggleUser}/>
    </div>
  )
}
