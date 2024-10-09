import React from 'react'
import { motion,useAnimationControls } from 'framer-motion';

export default function AnimationControls() {
    const controls=useAnimationControls();

    const handleClick=()=>{
        controls.start({
          rotate:["-90deg","0deg"]
        })
    }
    return (
        <div>
        <motion.button className="h-10 w-auto p-1 bg-violet-600" layout 
            whileTap={{
                scale:0.8,
            }}
            transition={{
                ease:"easeInOut"
            }}
            onClick={handleClick}
            >
            Flip It!
            </motion.button>
            <motion.div className="h-28 w-28 bg-black"
            initial={{
                rotate:"0deg"
            }}
            animate={controls}
            transition={{
                duration:0.5,
            }}
            >
            </motion.div>
        </div>
  )
}
