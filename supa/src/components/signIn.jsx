import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    }else {
      // ✅ Redirect to home page
      navigate('/')
    }

    setLoading(false)
  }

  return (
     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#e8f34a80] to-[#ff941680]">
    <form onSubmit={handleSignIn} className="max-w-md mx-auto mt-50 p-6 border rounded-lg shadow-md space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-black font-semibold rounded-md transition-colors duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-teal-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">
          <p>{error}</p>
        </div>
      )}
    </form>
    </div>
  )
}

export default SignIn;
