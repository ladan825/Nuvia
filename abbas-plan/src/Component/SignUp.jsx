import React from 'react'
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ✅ Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          first_name: firstName, 
          last_name: lastName,
          display_name: `${firstName} ${lastName}`,
          initials: `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // ✅ Insert / Update user in profiles table
    await supabase.from("profiles").upsert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName
    });

    navigate("/");
    setLoading(false);
  };

  return (
    <div className="">
      <form onSubmit={handleSignUp} className="white">
        <h5 className="grey-text text-darken-3">Sign Up</h5>

        <div className="input-field">
          <label htmlFor="firstName" className="active">First Name</label>
          <input type="text" id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="input-field">
          <label htmlFor="lastName" className="active">Last Name</label>
          <input type="text" id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="input-field">
          <label htmlFor="email" className="active">Email</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-field">
          <label htmlFor="password" className="active">Password</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div className="red-text center">{error}</div>}

        <button className="btn pink lighten-1 z-depth-0" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
