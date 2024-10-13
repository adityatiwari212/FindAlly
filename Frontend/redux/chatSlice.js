import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chatMessages:[],
        receiver:"",

    },
    reducers:{
        addMessage: (state,action)=>{
            state.chatMessages.push(action.payload)
        },
        addReceiver:(state,action)=>{
            state.receiver=action.payload
        }
    }
})

export const chatActions=chatSlice.actions