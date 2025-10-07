import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import Loader from './Loader';

const Home = () => {
  return (
    <motion.div className="home container" 
     exit={{x: '-100vw',
          transition: {ease: "easeInOut"}
        }}>
      <motion.h2  initial={{ fontSize: "20px", opacity: 0 }} 
        animate={{ fontSize: "50px", color: '#ff2994', opacity: 1}} 
        transition={{ duration: 0.5 }} >
        Welcome to Pizza Roll
      </motion.h2>
      <Link to="/base">
        <motion.button 
        whileHover={{ scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
            transition: {
              repeat: Infinity,
              duration: 1
            }
        }}>
          Create Your Pizza
        </motion.button>
      </Link>
      <Loader />
    </motion.div>
  )
}

export default Home;