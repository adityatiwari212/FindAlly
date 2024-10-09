import React, { useEffect } from 'react'
import { Messages } from '../components/messaging'
import { SimpleGrid,Card,CardHeader,CardFooter,Heading, Button } from '@chakra-ui/react'
export default function ChatPage() {
  // useEffect=()=>{

  // }
  return (
    <div className='flex items-center overflow-hidden mt-10 ' style={{width:'80%',height:"80vh"}}>
      <div className='w-1/3 flex flex-col justify-start  h-full bg-violet-600 rounded-l-xl '>
          <div className='w-auto h-10 bg-white m-2 rounded-xl'>
            User1
          </div>
      </div>
      <div className='w-2/3 h-full bg-white rounded-r-xl'>
          <Messages />
      </div>
    </div>
  )
}
