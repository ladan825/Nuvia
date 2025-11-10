import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { Link } from "react-router-dom"

const Home = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch projects once
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

  // Utility to shorten content text
  const getSnippet = (content) => {
    if (!content) return ""
    return content.length > 150 ? content.slice(0, 150) + "..." : content
  }

  return (
    <div className=" mt-10 min-h-screen flex flex-col items-center py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Latest Projects 🚀
      </h1>

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-center mb-6">
          Failed to load projects: {error}
        </p>
      )}

      {/* Loading skeleton */}
      {loading ? (
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
      ) : projects.length === 0 ? (
        <p className="text-gray-500 text-lg mt-6">No projects yet 😢</p>
      ) : (
        // Projects grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {projects.map((project) => (
            <Link
              to={`/project/${project.id}`}
              key={project.id}
              className="block p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm">{getSnippet(project.content)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
