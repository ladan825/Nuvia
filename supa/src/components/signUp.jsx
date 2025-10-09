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

  // NEW: for showing resend section + resend status
  const [showResend, setShowResend] = useState(false)
  const [resendStatus, setResendStatus] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setShowResend(false)
    setResendStatus(null)

    // Step 1: create auth account
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

    // Step 2: get user session (may be null until verified)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const userId = session?.user?.id

    // Step 3: if user not verified yet, show message and resend option
    if (!userId) {
      setError(
        "Signup successful! We've sent you a verification link. Please check your email to confirm your account."
      )
      setShowResend(true)
      setLoading(false)
      return
    }

    // Step 4: insert profile into Firestore table
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

  // 🚨 NEW: Resend email verification
  const handleResendEmail = async () => {
    if (!email) {
      setResendStatus({
        type: 'error',
        message: 'Email missing. Please re-enter your signup email.',
      })
      return
    }

    setResendStatus({ type: 'info', message: 'Sending...' })

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (resendError) {
      setResendStatus({
        type: 'error',
        message: `Failed to resend: ${resendError.message}`,
      })
    } else {
      setResendStatus({
        type: 'success',
        message:
          'Verification email resent! Check your inbox (and spam folder).',
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#e8f34a80] to-[#ff941680]">
      <form
        onSubmit={handleSignUp}
        className="max-w-md w-full mx-auto mt-8 p-6 border rounded-lg shadow-md space-y-5 bg-white"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Nuvia Account
        </h2>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
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
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700'
          }`}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {error && (
          <div className="text-red-600 text-sm text-center mt-2">
            <p>{error}</p>
          </div>
        )}

        {/* ✅ Show resend section after signup */}
        {showResend && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-center space-y-3">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={loading || resendStatus?.type === 'info'}
              className={`w-full px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200 ${
                (loading || resendStatus?.type === 'info')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {resendStatus?.type === 'info'
                ? 'Resending...'
                : 'Resend Verification Email'}
            </button>

            {resendStatus && (
              <p
                className={`text-sm ${
                  resendStatus.type === 'error'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {resendStatus.message}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default SignUp
