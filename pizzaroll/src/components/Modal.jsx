import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

const Modal = ({show, setshow}) => {
    return ( 
        <AnimatePresence exitBeforeEnter>
            { show && (
                <motion.div className="backdrop" 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{
          transition: {ease: "easeInOut"}
    }}>

                   <motion.div className="modal" 
                   initial={{y: "-100vh", opacity: 0}}
                   animate={{y: "200px", opacity: 1}}
                   transition={{delay: 0.5}}
                   exit={{y: "-100vh"}}
                   >
                        <p> want to make anoter pizza?</p>
                        <Link to={"/"}>
                        <button>start again</button></Link>
                    </motion.div> 
                </motion.div>
            )}
        </AnimatePresence>
     );
}
 
export default Modal;