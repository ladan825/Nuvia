import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const ADMIN_EMAIL = "abbasladan825@gmail.com"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProject, setEditedProject] = useState({ title: "", content: "" })

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()

      if (!error) {
        setProject(data)
        setEditedProject({ title: data.title, content: data.content })
      }
      setLoading(false)
    }

    getUser()
    fetchProject()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Delete this project?")) return
    await supabase.from("projects").delete().eq("id", id)
    navigate("/")
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from("projects")
      .update({
        title: editedProject.title,
        content: editedProject.content
      })
      .eq("id", id)

    if (!error) {
      setProject({ ...project, ...editedProject })
      setIsEditing(false)
    }
  }

  if (loading) return <div className="container center">Loading...</div>

  const canEdit = user && (user.email === project.author_email || user.email === ADMIN_EMAIL)

  return project ? (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">

          {isEditing ? (
            <>
              <input
                type="text"
                className="input-field"
                value={editedProject.title}
                onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
              />
              <textarea
                className="materialize-textarea"
                value={editedProject.content}
                onChange={(e) => setEditedProject({ ...editedProject, content: e.target.value })}
              />
            </>
          ) : (
            <>
              <span className="card-title" onClick={() => canEdit && setIsEditing(true)}>
                {project.title}
              </span>
              <p onClick={() => canEdit && setIsEditing(true)}>
                {project.content}
              </p>
            </>
          )}
        </div>

        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {project.author_firstname} {project.author_lastname}</div>
          <div>{new Date(project.created_at).toDateString()}</div>
        </div>

        {canEdit && (
          <div className="card-action">
            {isEditing ? (
              <>
                <button className="btn green" onClick={handleSave}>Save</button>
                <button className="btn grey" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn red" onClick={handleDelete}>Delete</button>
                <button className="btn blue" onClick={() => setIsEditing(true)}>Edit</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="container center">Project not found.</div>
  )
}

export default ProjectDetails
