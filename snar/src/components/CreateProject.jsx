import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import {  Loader2Icon, PlusCircle } from "lucide-react";

const CreateProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    const { error: insertError } = await supabase.from("projects").insert({
      title,
      content,
      author_firstname: user?.user_metadata?.first_name || "Anonymous",
      author_lastname: user?.user_metadata?.last_name || "",
      user_id: user?.id,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      navigate("/dash"); // redirect back to dashboard
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create a New Project
        </h2>

        {/* Title Field */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your project title"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
          />
        </div>

        {/* Content Field */}
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Project Description
          </label>
          <textarea
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Describe what your project is about..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 min-h-50 max-h-800"
          ></textarea>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg shadow-md transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin w-5 h-5" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              Create Project
            </>
          )}
        </button>

        {/* Back link */}
        <p
          onClick={() => navigate("/dash")}
          className="text-center text-indigo-500 hover:underline cursor-pointer mt-5"
        >
          ← Back to Dashboard
        </p>
      </form>
    </div>
  );
};

export default CreateProject;
