import React, { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

const CreateProject = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user

    const { error: insertError } = await supabase.from("projects").insert({
      title,
      content,
      author_firstname: user?.user_metadata?.first_name || "Anonymous",
      author_lastname: user?.user_metadata?.last_name || "",
      user_id: user?.id,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      navigate("/")
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create Project</h5>

        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
            className="materialize-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {error && <p className="red-text">{error}</p>}

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject
