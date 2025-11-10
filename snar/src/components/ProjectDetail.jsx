import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

const ADMIN_EMAIL = "abbasladan825@gmail.com"

const ProjectDetail = () => {
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

      if (!error && data) {
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
        content: editedProject.content,
      })
      .eq("id", id)

    if (!error) {
      setProject({ ...project, ...editedProject })
      setIsEditing(false)
    }
  }

  const canEdit = user && (user.email === project?.author_email || user.email === ADMIN_EMAIL)

  // ✅ Skeleton Loader
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-2xl p-6 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Project not found 😢
      </div>
    )

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center mt-20">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Title / Edit */}
        {isEditing ? (
          <input
            type="text"
            className="w-full text-3xl font-semibold text-indigo-700 border-b border-gray-300 focus:outline-none focus:border-indigo-500 mb-4"
            value={editedProject.title}
            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
          />
        ) : (
          <h1
            className={`text-3xl font-bold text-indigo-700 mb-4 ${
              canEdit ? "cursor-pointer hover:underline" : ""
            }`}
            onClick={() => canEdit && setIsEditing(true)}
          >
            {project.title}
          </h1>
        )}

        {/* Content / Edit */}
        {isEditing ? (
          <textarea
            className="w-full min-h-[150px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 mb-4"
            value={editedProject.content}
            onChange={(e) => setEditedProject({ ...editedProject, content: e.target.value })}
          />
        ) : (
          <p
            className={`text-black leading-relaxed whitespace-pre-line ${
              canEdit ? "cursor-pointer hover:bg-gray-50 p-2 rounded-lg" : ""
            }`}
            onClick={() => canEdit && setIsEditing(true)}
          >
            {project.content}
          </p>
        )}

        {/* Meta Info */}
        <div className="mt-6 flex justify-between items-center text-sm text-black border-t pt-4">
          <span>
            Posted by{" "}
            <strong>
              {project.author_firstname} {project.author_lastname}
            </strong>
          </span>
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>

        {/* Edit/Delete Buttons */}
        {canEdit && (
          <div className="mt-6 flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
