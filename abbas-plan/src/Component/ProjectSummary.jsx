import React from 'react'
const ProjectSummary = ({ project }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
<p>Posted by {project.author_firstname} {project.author_lastname}</p>  {/* ✅ fixed */}
<p>{project.content}</p>
<p>Created: {new Date(project.created_at).toLocaleString()}</p> {/* ✅ fixed */}

      </div>
    </div>
  );
};

export default ProjectSummary;
