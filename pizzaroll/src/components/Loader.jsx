import { motion, useCycle } from "framer-motion"

const loaderVariants = {
  animationOne: { 
    x: [-20, 20, -20],   // side-to-side loop
    y: [0, -30, 0],      // up then down
    transition: {
      x: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      },
      y: {
        repeat: Infinity,
        duration: 1,
        ease: ["easeOut", "easeIn"], // smooth curve
        times: [0, 0.5, 1]
      }
    }
  },
  animationTwo: { 
    y: [0, -40, 0],   // bounce up then down
    x: 0,      
    transition: {
      y: {
        repeat: Infinity,
        duration: 0.5,
        ease: ["easeOut", "easeIn"]
      }
    }
  }
}

const Loader = () => {
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");

  return (
    <>
      <motion.div 
        className="loader"
        variants={loaderVariants}
        animate={animation}   // ✅ useCycle controls this
        
      />
      <div 
        onClick={() => cycleAnimation()} 
      >
        Cycle Loader
      </div>
    </>
  );
}
 
export default Loader;
