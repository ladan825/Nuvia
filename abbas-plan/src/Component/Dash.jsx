import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate, Navigate } from "react-router-dom";

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
        navigate("/login");
        return;
      }

      let query = supabase.from("projects").select("*").order("created_at", { ascending: false });

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

  if (loading) return <div className="container center">Loading...</div>;

  return (
    <div className="container">
      <h4>Your Projects</h4>
      {projects.length ? (
        projects.map((project) => (
          <div className="card" key={project.id}>
            <Link to={`/project/${project.id}`}>
              <h3>{project.title}</h3>
              <p>{project.content}</p>
            </Link>
            <div className="card-action">
              <button className="btn blue" onClick={() => navigate(`/edit/${project.id}`)}>Edit</button>
              <button className="btn red" onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>You haven't added any projects yet.</p>
      )}
    </div>
  );
};

export default Dash;
