import React from "react";
import { SignupForm } from "../components/signup";
import { LoginForm } from "../components/loginform";
import { useDispatch, useSelector } from "react-redux";

export function HomePage(){
    const [isSignup,setSignup]=React.useState(true)
    const [text,setText]=React.useState('')
    const fullText='Connect Now!'
    React.useEffect(()=>{
      setTimeout(()=>tick(),200)

    },[text])
    const tick=()=>{
      let len=text.length
      if(len==fullText.length) setText('')
      else{
        setText(fullText.substring(0,len+1))
      }
    }
    const counter=useSelector((store)=>store.counter)
    const dispatch=useDispatch();

    return(
      <>
        <div className="mt-24  flex flex-col items-center justify-end">
        <button className="border-2 border-violet-600 rounded-xl p-2" onClick={()=>dispatch({type:'INCREMENT'})}>Increment</button>
        <span>{counter}</span>
        <div className="h-20  flex justify-center items-center p-4">
          <span className="text-center font-bold text-violet-600 text-3xl">{text}|</span>
        </div>
        {isSignup?<SignupForm toggleSignup={setSignup}/>:<LoginForm toggleSignup={setSignup}/> }
        </div>
      </>
    )
}