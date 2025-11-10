import { ShoppingBag } from "lucide-react";

const Nav = () => {
  return (
    <div className="w-full h-16 mb-10 bg-black text-white border-b-2 border-gray-400 glow-md p-5">

      <nav className="flex justify-between">
        <ul><li>Native Treats</li></ul>
        <ul><li><ShoppingBag /></li></ul>
      </nav>
    </div>
    );
}
 
export default Nav;