import React from 'react'
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

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/') // Redirect to dashboard
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <form onSubmit={handleSignIn} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>

        <div className="input-field">
          <label htmlFor="email" className="active">Email</label>
          <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="input-field">
          <label htmlFor="password" className="active">Password</label>
          <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="btn pink lighten-1 z-depth-0" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <div className="red-text center"><p>{error}</p></div>}
      </form>
    </div>
  )
}

export default SignIn
