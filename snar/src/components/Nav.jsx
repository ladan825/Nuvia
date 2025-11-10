import { Link } from "react-router-dom";
import SigninLink from "./SigninLink";
import SignoutLink from "./SignoutLink";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-black text-white w-full px-6 py-4 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-white hover:text-gray-300 transition"
          >
            Snar
          </Link>
          <Link
            to="/dash"
            className="text-lg hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
        </div>

        {/* Right: Auth Links */}
        <div>
          {user ? <SigninLink user={user} /> : <SignoutLink />}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
