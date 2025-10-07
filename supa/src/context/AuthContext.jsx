import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Check current user on load
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Fetch profile from Supabase on user change
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!error) setProfile(data)
      } else {
        setProfile(null)
      }
    }

    fetchProfile()
  }, [user])

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => useContext(AuthContext)
