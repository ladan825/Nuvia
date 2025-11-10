import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Edit3, Trash2, PlusCircle } from "lucide-react";

const ADMIN_EMAIL = "abbasladan825@gmail.com";

const Dash = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      setUser(currentUser);

      // If no user → redirect immediately
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      let query = supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      // If user is not admin → only show their projects
      if (currentUser.email !== ADMIN_EMAIL) {
        query = query.eq("user_id", currentUser.id);
      }

      const { data, error } = await query;
      if (!error) setProjects(data || []);
      setLoading(false);
    };

    fetchUserAndProjects();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // 🩶 Skeleton loader while data loads
  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loading projects...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse p-6 border border-gray-200 rounded-xl bg-white/60 shadow-sm"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 💻 Actual Dashboard
  return (
    <div className="min-h-screen py-10 px-6 flex flex-col items-center  mt-20">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.email === ADMIN_EMAIL ? "Admin Dashboard" : "Your Projects"}
        </h1>
       
      </div>

      {projects.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
            >
              <Link to={`/project/${project.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {project.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {project.content}
                </p>
              </Link>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  {new Date(project.created_at).toDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit/${project.id}`)}
                    className="p-2 text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-center mt-10">
          <p className="text-lg">You haven’t added any projects yet.</p>
          <button
            onClick={() => navigate("/create")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Dash;
