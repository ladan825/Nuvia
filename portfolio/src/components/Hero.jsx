import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
        const navigate = useNavigate()


    const clickKo = () => {
            navigate("/projects")
    }

  return ( 
    <section
      id="/"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex items-center justify-center gap-2">
          <span className="filter brightness-55">Hi, I'm</span>

          {/* IMAGE DIV */}
          <div className="h-20 w-10 rounded-full border overflow-hidden mx-2">
            <img
              src="pic.jpg"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>

          <span className="text-cyan-500">Muhammad </span>
          <span className="ml-2"> Abbas</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-2-2xl">
            I craft and create beautiful, interactive web applications, from polished front-end interfaces to robust back-end systems.
             I love designing seamless user experiences that connect design and functionality.

        </p>

        <div>
            <button  onClick={clickKo} className="h-8  px-4 border-1 border-pink-500 bg-indigo-500 rounded-full hover:border-4 transition-full duration-200">View My Work</button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span>Scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
