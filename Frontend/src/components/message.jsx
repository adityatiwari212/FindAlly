import React from 'react'

export default function Message({sender,data,user,time}) {
  const messageTime=new Date(time)
  const hours =  messageTime.getHours().toString().padStart(2, '0'); // Add leading zero
  const minutes = messageTime.getMinutes().toString().padStart(2, '0');
  return (
    <div className={`flex chat ${sender===user?'chat-end':'chat-start'} flex-col h-auto w-auto p-1 rounded-xl mb-2 `} >
     <div className='chat-bubble flex flex-col'>
      <span>{sender}</span>
      <span>{data}</span>
     </div>
     <span>{hours}:{minutes}</span>
    </div>
  )
}
