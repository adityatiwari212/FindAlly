import React from "react";
import { SignupForm } from "../components/signup";
import { LoginForm } from "../components/loginform";

export function HomePage(){
    const [isSignup,setSignup]=React.useState(true)
    return(
      <>
        <div className="mt-28 flex flex-col items-center justify-center">
          {isSignup?<SignupForm toggleSignup={setSignup}/>:<LoginForm toggleSignup={setSignup}/> }
        </div>
      </>
      )
}