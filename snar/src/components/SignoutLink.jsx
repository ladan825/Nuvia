import { NavLink } from "react-router-dom";

const SignoutLink = () => {
  return (
    <ul className="flex items-center gap-6 text-sm sm:text-base">
      <li>
        <NavLink
          to="/signup"
          className="hover:text-gray-300 transition"
        >
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signin"
          className="hover:text-gray-300 transition"
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default SignoutLink;
