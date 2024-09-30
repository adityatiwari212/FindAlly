import {createStore} from "redux"

const INITIAL_VAL={
    counter:5,
    user:{
        id:"",
        token:""
    }
}

const counterReducer=(store=INITIAL_VAL,action)=>{
    let newStore=store
    if(action.type=="INCREMENT")
        newStore.counter++
    if(action.type=="LOGIN"){
        newStore.user=action.payload
        console.log('payload:',action.payload);
    }
    if(action.type=="LOGOUT")
        newStore.user={}
    console.log("Action : ",action.type);
    return newStore
}

const counterStore=createStore(counterReducer)

export default counterStore