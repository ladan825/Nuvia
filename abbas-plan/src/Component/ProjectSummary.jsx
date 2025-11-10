const ProjectSummary = ({ project }) => {
  return (
    <div className="">
      <div className="">
        <span className="">{project.title}</span>
<p>Posted by {project.author_firstname} {project.author_lastname}</p>  {/* ✅ fixed */}
<p>{project.content}</p>
<p>Created: {new Date(project.created_at).toLocaleString()}</p> {/* ✅ fixed */}

      </div>
    </div>
  );
};

export default ProjectSummary;
