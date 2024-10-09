import React, { useEffect, useState } from "react";
import { SignupForm } from "../components/signup";
import { LoginForm } from "../components/loginform";
import {AnimatePresence, motion, useAnimationControls, useScroll, useSpring, useTransform, } from "framer-motion"

export function HomePage(){
    const [isSignup,setSignup]=React.useState(true)
    const [text,setText]=React.useState('')
    const {scrollYProgress}=useScroll();
    const scaleX=useSpring(scrollYProgress)
    const backgroundColor=useTransform(scrollYProgress,
      [0,0.5,1],
      ["","red","green"]
    )
    
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

    return(
      <>
        <div className="mt-24  flex flex-col items-center justify-end">
        {/* <button className="border-2 border-violet-600 rounded-xl p-2" onClick={()=>dispatch({type:'INCREMENT'})}>Increment</button>
        <span>{counter}</span> */}
        <div className="h-20  flex justify-center items-center p-4">
          <span className="text-center font-bold text-violet-600 text-3xl">{text}|</span>
        </div>
        {isSignup?<SignupForm toggleSignup={setSignup}/>:<LoginForm toggleSignup={setSignup}/> }
        {/* <motion.div
          className="mt-5 w-screen h-10 text-black font-bold bg-blue-500 fixed top-0"
          initial={{
            opacity:1
          }}
          whileInView={{
            opacity:1
          }}
          transition={{
            duration:1
          }}
          style={{
            scaleX,
            backgroundColor,
            transformOrigin:"left",
          }}
        >
        </motion.div> */}
        {/* <div className="mt-5 text-black font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste ducimus assumenda magnam alias nisi magni eligendi explicabo! Commodi labore esse alias eveniet aspernatur tenetur qui, hic ad delectus sit itaque laborum quia libero, quibusdam nihil. Beatae similique cum corporis.
          <br />
        </div> */}
        </div>
      </>
    )
}