import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const Base = ({ addBase, pizza }) => {
  const bases = ['Classic', 'Thin & Crispy', 'Thick Crust'];

  return (
    <motion.div className="base container"
    initial={{opacity:0, x: '100vw'}}
    animate={{opacity:1, x:0}}
    transition={{ type: 'spring', delay: 0.5}}
     exit={{x: '-100vw',
          transition: {ease: "easeInOut"}
        }}>

      <h3>Step 1: Choose Your Base</h3>
      <ul>
        {bases.map(base => {
          let spanClass = pizza.base === base ? 'active' : '';
          return (
            <motion.li key={base} onClick={() => addBase(base)}
            whileHover={{ scale: 1.3,originX:0 }}>
              <span className={spanClass}>{ base }</span>
            </motion.li>
          )
        })}
      </ul>

      {pizza.base && (
        <motion.div className="next" 
        initial={{ x: '-100vw'}}
        animate={{ x: 0}}
        >
          <Link to="/toppings">
            <button>Next</button>
          </Link>
        </motion.div>
      )}

    </motion.div>
  )
}

export default Base;