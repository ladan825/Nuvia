import { Link } from "react-router-dom"; 
 
const Gender = () => { 
  return ( 
    <section className="w-full flex"> 
       
      {/* Men */} 
      <Link to="/men" className="flex-1 flex flex-col items-center group"> 
        <div className="w-full aspect-[3/4] overflow-hidden"> 
          <img 
            src="/pic/m1.jpeg" 
            alt="Men's Collection" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700" 
          /> 
        </div> 
        <h2 className="font-heading mt-6  text-2xl tracking-wide text-gray-900"> 
          Men 
        </h2> 
      </Link> 
 
      {/* Women */} 
      <Link to="/women" className="flex-1 flex flex-col items-center group"> 
        <div className="w-full aspect-[3/4] overflow-hidden"> 
          <img 
            src="/pic/f6.jpeg" 
            alt="Women's Collection" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700" 
          /> 
        </div> 
        <h2 className="font-heading mt-6 text-2xl tracking-wide text-gray-900"> 
          Women 
        </h2> 
      </Link> 
 
    </section> 
  ); 
}; 
 
export default Gender;