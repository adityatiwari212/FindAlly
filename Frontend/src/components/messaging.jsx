import { Box, Img } from "@chakra-ui/react";
import { useEffect,useRef,useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../context/socket";
import Message from "./message";
import axios from "axios";
import { host } from "../routes";
import { useSelector } from "react-redux";
import { RiAttachment2 } from "react-icons/ri";

export function Messages({info,chat,name,receiverId}){
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const socket=useSocket();
    const fileInputRef=useRef()
    const [file,setFile]=useState('')
    const [preview,setPreview]=useState('')
    //loading messages
    useEffect(()=>{
        const loadAllMessages=async()=>{
            try {
              const response = await axios.get(`${host}/user/messages/${chat}`,{
                headers:{
                  "content-type":"application/json",
              },
              credentials:true
              })
              if(response.data.success){
                console.log("fetched messages:",response.data);          
                const {messages}=response.data
                setMessages(messages)
              }
            } catch (error) {
              alert(error)
            }
          }
        if(chat!=""){
            loadAllMessages()
        }
    },[chat])
    //socket liteners
    useEffect(()=>{                                  
            socket?.on("receiveMessage",(payload)=>{
                console.log("Message:",payload);                
                if(payload){               
                    const {sender,data,timestamp}=payload
                    setMessages((prevMessages)=>{
                        const updatedMessages = [...prevMessages, { sender, data, timestamp }];
                        console.log("Updated Messages: ", updatedMessages); // Log the updated messages
                        return updatedMessages;
                    })
                }   
        })
        return ()=>socket.off("receiveMessage")
    },[socket])    
    //Selecting file
    const selectFile=()=>{
        fileInputRef.current.click()
    }
    //set the File
    const setSelectedFile = (e) => {      
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
          setFile(selectedFile); // Set the file state
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            setPreview(reader.result); // Set the preview state
          };
        }
      };
    //Sending message
    const handleSendMessage=()=>{   
        if(newMessage!="")  
        socket.emit("sendMessage",{sender:info._id,receiver:receiverId,messageType:"text",data:newMessage,chat})
        setNewMessage("")
    }
    return(
       <div className="relative h-full w-full flex flex-col items-center justify-end p-2">
        <div className="w-full flex justify-center items-center text-violet-600 font-semibold h-10 border-b-2 border-violet-600 absolute top-0">
            <span className="pl-2">{name}</span>
        </div>
        <div className="justify-end h-4/5 w-full overflow-auto">
        {messages.length>0?messages.map((message,id)=>{
            return <Message sender={message.sender.username} user={info.username} data={message.data} time={message.timestamp} key={id}/>
        }):<div className="font-semibold w-full text-violet-600 text-center h-full">No messages yet</div>}
        </div>
        <div className='h-auto relative mb-2 flex p-1 items-center bg-white border-2 border-violet-600 rounded-xl text-center' style={{width:'90%'}}>
            <div>
                {preview && <img src={preview} className="w-10 h-10"/>}
                <input type="file" className="hidden" ref={fileInputRef} onChange={setSelectedFile}/>
                <RiAttachment2 className="cursor-pointer" onClick={selectFile}/>
            </div>
            <input value={newMessage} className="h-full border-none focus:outline-none" placeholder=" Send Message" style={{width:'95%'}} onChange={(e)=>setNewMessage(e.target.value)}></input>
            <IoIosSend className="cursor-pointer" onClick={handleSendMessage}/>
        </div>
       </div>
    )
}