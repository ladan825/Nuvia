import { useState } from "react";
import { Link } from "react-router-dom";

const Food = () => {
  const [navOpen, setNavOpen] = useState(false);
   const toggleNav = () => {
    setNavOpen(!navOpen);
  };
    return ( 
          <div className="grid grid-cols-2">
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <nav className="flex">
            <div className="md:hidden cursor-pointer" onClick={toggleNav}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</div>
          <div className="flex py-5">
            <h1 className="font-bold p-4 text-2xl"><Link to="/" className="hover:text-green-700"> Foodie</Link></h1>
          </div>
          <ul className="flex space-x-100 font-semibold text-gray-700 py-10 px-20">
            <li className="text-grey-100 font-bold hover:border-r-4 hover:border-red-300"><Link to="#"><span >Home</span></Link></li>
            <li className=" hover:border-r-4 hover:border-red-300"><Link to="#"><span>About</span></Link></li>
            <li className=" hover:border-r-4 hover:border-red-300"><Link to="#"><span>Contact</span></Link></li>
          </ul>
        </nav>
        </div>

         {navOpen && (
        <ul className="absolute top-16 right-4 bg-white shadow p-4 rounded-md space-y-4 font-semibold md:hidden">
          <li><Link to="#" nClick={toggleNav}>Home</Link></li>
          <li><Link to="#" onClick={toggleNav}>About</Link></li>
          <li><Link to="#" onClick={toggleNav}>Contact</Link></li>
        </ul>
      )}
        <main className="px-16 py-6 bg-gray-100 col-span-2">
           <div className="flex justify-center md:justify-end ">
            <a href="#" className="btn ml-4 text-red-300 border-2 mr-2 border-red-400 hover:bg-red-500 hover:text-white transition ease-in duration-500">Login</a>
            <a href="#" className="btn text-red-300 border-2 border-red-400  hover:bg-red-500 hover:text-white transition ease-out duration-500">Signup</a>
          </div>

          <header>
            <h2 className="text-6xl">Recipes</h2>
            <h3 className="font-semibold text-2xl">For Ninjas</h3>
          </header>
          <div>
            <h4 className="font-bold mt-12 border-b border-grey-200">Latest recipes</h4>
          </div>
            <div className="mt-8 grid grid-cols-3">
              <div className="card hover:shadow-lg">
                  <img src="chow3.jpg" alt="" className="w-full object-cover"/>
                <div className="m-3">
              <span className="font-bold">Rice</span> <br />
              <span className="text-gray-400 text-sm">Cooked by Chef Ladan</span>
              </div>
              <div className="badge">
                <span>25 min</span>
              </div>
              </div>

               <div className="card hover:shadow-2xl">
                  <img src="chow1.jpg" alt="" className="w-full object-cover"/>
                <div className="m-3">
              <span className="font-bold">Rice</span> <br />
              <span className="text-gray-400 text-sm">Cooked by Chef Ladan</span>
              </div>
              <div className="badge">
                <span>25 min</span>
              </div>
              </div>

               <div className="card hover:shadow-lg">
                  <img src="chow2.jpg" alt="" className="w-full object-cover"/>
                <div className="m-3">
              <span className="font-bold">Rice</span> <br />
              <span className="text-gray-400 text-sm">Cooked by Chef Ladan</span>
              </div>
              <div className="badge">
                <span>25 min</span>
              </div>
              </div>
            </div>

            <h4 className="mt-12 font-bold pb-2 border-b border-grey-200">Most Popular </h4>

            <div className="mt-8">

            </div>
            <div className="flex justify-center">
              <div className="btn bg-gray-600 sm:bg-red-100 hover:inner-shadow transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">Load More....</div>
            </div>
        </main>
         
          </div>
     );
}
 
export default Food ;
