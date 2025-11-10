import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/') // redirect to dashboard
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 border-2 border-black hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Welcome Back 👋</h2>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-black mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg  text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-black mb-1">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error */}
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
