import React from 'react'
import { motion,AnimatePresence } from 'framer-motion'

export default function basicFramer() {
  const [show,setShow]=React.useState(true)
  return (
    <div>
      <motion.button className="h-10 w-auto p-1 bg-violet-600" layout onClick={()=>setShow(!show)}>Show/Hide</motion.button>
        <AnimatePresence mode="popLayout">
          {show && <motion.div 
          initial={{
            rotate:"0deg",
            scale:0,
            y:0,
            x:-150,
          }}
          animate={{
            rotate:"180deg",
            scale:1,
            x:0,
            // y:[0,150,-150,-150,0]
          }}
          exit={{
            rotate:"0deg",
            scale:0,
            y:0,
            x:-150,
          }}
          transition={{
            duration:1,
            ease:"easeIn",
            // times:[0,0.25,0.5,0.85,1],
          }}
          className="h-28 w-28 bg-black"></motion.div>}
        </AnimatePresence>
    </div>
  )
}
