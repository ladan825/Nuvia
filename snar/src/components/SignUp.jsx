import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // ✅ Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          display_name: `${firstName} ${lastName}`,
          initials: `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // ✅ Insert or update profile data
    if (data?.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName}`,
        initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
        email,
      })
    }

    navigate('/dash')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-8 border-2 border-black">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Create an Account 🚀</h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-black mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-black mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-black mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-200"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

      
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
