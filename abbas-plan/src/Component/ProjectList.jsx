import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

// ⭐️ Define the maximum length for the content snippet ⭐️
const SNIPPET_LENGTH = 150; // Roughly 2-3 lines of text

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProjects(data);
    };

    fetchProjects();
  }, []);

  // ⭐️ Utility function to truncate the content ⭐️
  const getSnippet = (content) => {
    if (content.length <= SNIPPET_LENGTH) {
      return content;
    }
    // Truncate and add an ellipsis (...)
    return content.substring(0, SNIPPET_LENGTH) + '...';
  };

  return (
    <div className=''>
      {projects.length ? (
        projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id}>
            <div className="card grid grid-cols-3">
              <h3>{project.title}</h3>
              {/* ⭐️ Display only the truncated content here ⭐️ */}
              <p>{getSnippet(project.content)}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No projects yet</p>
      )}
    </div>
  );
};

export default ProjectList;