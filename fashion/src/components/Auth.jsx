import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Enter your full name"),
});

export default function Auth({ mode = "login" }) {
  const isSignup = mode === "signup";
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [serverError, setServerError] = useState("");
  const [info, setInfo] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(isSignup ? signupSchema : loginSchema) });

  const onSubmit = async (values) => {
    setServerError("");
    setInfo("");
    if (isSignup) {
      const { data, error } = await signUp(values.email, values.password, values.fullName);
      if (error) return setServerError(error.message);
      if (!data.session) return setInfo("Check your email to confirm your account, then log in.");
      navigate(from, { replace: true });
    } else {
      const { error } = await signIn(values.email, values.password);
      if (error) return setServerError(error.message);
      navigate(from, { replace: true });
    }
  };

  const input = "w-full border-b border-gray-300 focus:border-black outline-none py-3 text-sm bg-transparent";

  return (
    <div className="max-w-md mx-auto px-6 pt-32 pb-20">
      <h1 className="font-heading text-3xl text-center">{isSignup ? "Create Account" : "Log In"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-6">
        {isSignup && (
          <div>
            <input {...register("fullName")} placeholder="Full name" className={input} />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
          </div>
        )}
        <div>
          <input {...register("email")} type="email" placeholder="Email" className={input} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="password" placeholder="Password" className={input} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}
        {info && <p className="text-sm text-green-700">{info}</p>}

        <button
          disabled={isSubmitting}
          className="bg-black text-white uppercase text-sm tracking-widest py-4 hover:opacity-80 transition disabled:opacity-50"
        >
          {isSubmitting ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        {isSignup ? "Already have an account? " : "New to VOGMODA? "}
        <Link
          to={isSignup ? "/login" : "/signup"}
          state={{ from }}
          className="text-black border-b border-black"
        >
          {isSignup ? "Log in" : "Create one"}
        </Link>
      </p>
    </div>
  );
}