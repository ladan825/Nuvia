import { useEffect} from "react";
import { motion} from "framer-motion"

const Order = ({ pizza, setShow }) => {
  useEffect(() => {
    setTimeout(() =>{
      setShow(true)
   }, 5000 )
  }, [setShow])
  return (
        <motion.div className="order container"
    initial={{opacity:0, x: '100vw'}}
    animate={{opacity:1, x:0}}
    transition={{ type: 'spring', delay: 0.5}}
     exit={{x: '-100vw',
          transition: {ease: "easeInOut"}
        }}>

          <h2> Thank you for your order :)</h2>
      <p>You ordered a {pizza.base} pizza with:</p>
      {pizza.toppings.map(topping => <div key={topping}>{topping}</div>)}
    </motion.div>
  )
}

export default Order;