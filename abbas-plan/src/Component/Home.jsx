// src/components/dashboard/Dashboard.jsx
import React from 'react'
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import ProjectList from "./ProjectList"

const Home = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) setError(error.message)
      else setProjects(data)

      setLoading(false)
    }

    fetchProjects()
  }, [])
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          {loading && <p>Loading projects...</p>}
          {error && <p className="red-text">Error: {error}</p>}

          {!loading && !error && <ProjectList projects={projects} />}
        </div>
        </div>
      </div>
  )
}

export default Home
