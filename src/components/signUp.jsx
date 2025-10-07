import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const displayName = `${firstName} ${lastName}`

    // Get session to retrieve user ID
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    const userId = session?.user?.id

    if (!userId) {
      setError('Signup successful, but email verification is required before continuing.')
      setLoading(false)
      return
    }

    const { error: dbError } = await supabase.from('profiles').insert({
      id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
    })

    if (dbError) {
      setError(dbError.message)
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  return (
     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#e8f34a80] to-[#ff941680]">
    <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-teal-700'
        }`}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      {error && (
        <div className="text-red-600 text-sm text-center">
          <p>{error}</p>
        </div>
      )}
    </form>
    </div>
  )
}

export default SignUp
