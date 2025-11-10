import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { PlusCircle } from "lucide-react";

const SigninLink = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <ul className="flex items-center gap-6 text-sm sm:text-base">
      <li>
         <button
                  onClick={() => navigate("/create")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  <PlusCircle size={20} />
                  <span>Add Project</span>
                </button>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="hover:text-gray-300 transition"
        >
          Log out
        </button>
      </li>
      <li>
        <div className="bg-gray-700 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold">
          {initials}
        </div>
      </li>
    </ul>
  );
};

export default SigninLink;
