import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const clickKo = () => {
    navigate("/projects");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        className="container max-w-4xl mx-auto z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-2">
          <span className="text-gray-800">Hi, I'm</span>

          {/* Avatar */}
          <div className="h-14 w-14 md:h-20 md:w-20 rounded-full border overflow-hidden mx-2">
            <img
              src="pic.jpg"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>

          <span className="text-cyan-500">Muhammad</span>
          <span className="ml-2">Abbas</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          I craft and create beautiful, interactive web applications, from
          polished front-end interfaces to robust back-end systems. I love
          designing seamless user experiences that connect design and
          functionality.
        </p>

        {/* CTA */}
        <div className="mt-6">
          <button
            onClick={clickKo}
            className="px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors"
          >
            View My Work
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-600">Scroll</span>
          <ArrowDown className="h-5 w-5 text-indigo-500 mt-1 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
