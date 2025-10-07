import { motion } from "framer-motion"
import { Link } from "react-router-dom";


const pathVariants = {
  hidden: { 
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
}

const Header = () => {
  return (
    <header>
      <motion.div className="logo"
      drag>
        <motion.svg 
          className="pizza-svg" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100"
          initial={{ rotate: -180}}
          animate={{ rotate: 0}}
          transition={{ duration: 1}}
        >
          <motion.path
            fill="none"
            stroke="white"   // ✅ needs a stroke to show pathLength animation
            strokeWidth="2"
            d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            fill="none"
            stroke="white"
            strokeWidth="2"
            d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
      </motion.div>
      <Link to={"/"}>
        <motion.div 
          className="title"
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ duration: 1, type: 'spring', stiffness: 120 }}
        >
          <h1>Pizza Roll</h1>
        </motion.div>
      </Link>
    </header>
  )
}

export default Header;
