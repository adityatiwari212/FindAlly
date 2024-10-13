import {createSlice} from "@reduxjs/toolkit"

export const userSlice=createSlice({
    name:"user",
    initialState:{
        token:"",
        info:null,
    },
    reducers:{
        login:(state,action)=>{  
            console.log("logging in",action);          
            return state=action.payload
        },
        update:(state,action)=>{
            console.log("updating",action);
            state.info=action.payload
        }
    }
})

export const userActions=userSlice.actions
