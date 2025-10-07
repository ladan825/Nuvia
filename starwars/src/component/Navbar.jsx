
const Navbar = ({ setpage }) => {

    return (  
        <nav className="flex justify-center mt-10">
            <button className="border-black-300 border-3 rounded-full text-3xl p-2 mr-10 hover:border-orange-300" onClick={() => setpage('planet')}>Planet</button>
            <button className="border-black-300 border-3 rounded-full text-3xl p-2 hover:border-pink-500" onClick={() => setpage('people')}>People</button>
        </nav>
    );
}
 
export default Navbar;