import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="h-[90vh] flex flex-col justify-center items-center bg-white text-center text-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-6xl font-extrabold mb-6 
                    bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 
                    bg-clip-text text-transparent"
      >
        Refresh Your Day with <span className="text-black">Nuvia</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-lg max-w-xl text-black"
      >
        Discover bold flavours, crafted to energize your lifestyle. 
        Sip happiness, one bottle at a time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-10"
      >
        <Link
          to="/shop"
          className="px-8 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-purple-400 hover:text-black transition"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  )
}