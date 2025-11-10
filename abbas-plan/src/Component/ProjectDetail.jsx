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

  if (loading) return <div className="">Loading...</div>

  const canEdit = user && (user.email === project.author_email || user.email === ADMIN_EMAIL)

  return project ? (
    <div className="">
      <div className="">
        <div className="card">

          {isEditing ? (
            <>
              <input
                type="text"
                className=""
                value={editedProject.title}
                onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
              />
              <textarea
                className=""
                value={editedProject.content}
                onChange={(e) => setEditedProject({ ...editedProject, content: e.target.value })}
              />
            </>
          ) : (
            <>
              <span className="" onClick={() => canEdit && setIsEditing(true)}>
                {project.title}
              </span>
              <p onClick={() => canEdit && setIsEditing(true)}>
                {project.content}
              </p>
            </>
          )}
        </div>

        <div className="">
          <div>Posted by {project.author_firstname} {project.author_lastname}</div>
          <div>{new Date(project.created_at).toDateString()}</div>
        </div>

        {canEdit && (
          <div className="card">
            {isEditing ? (
              <>
                <button className="" onClick={handleSave}>Save</button>
                <button className="" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="" onClick={handleDelete}>Delete</button>
                <button className="" onClick={() => setIsEditing(true)}>Edit</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="">Project not found.</div>
  )
}

export default ProjectDetails
