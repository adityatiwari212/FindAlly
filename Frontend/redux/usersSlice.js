import { createSlice } from "@reduxjs/toolkit";

export const UsersSlice= createSlice({
    name:"Users",
    initialState:{
        allUsers:null,
    },
    reducers:{
        addUsers:(state,action)=>{
            console.log("Added All following users to slice :",action.payload);            
            state.allUsers=action.payload
        }
    }
})

export const UsersActions=UsersSlice.actions