import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // <-- make sure you import this

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [formError, setFormError] = useState(null)
  const [accessDenied, setAccessDenied] = useState(false)

  const { user } = useAuth() // get the logged in user
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // ✅ Only allow your email
  useEffect(() => {
    if (!user) return
    if (user.email !== 'abbasladan825@gmail.com') {
      setAccessDenied(true)
    }
  }, [user])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newDrink) => {
      let image_url = null

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, imageFile)

        if (uploadError) throw new Error('Error uploading image')

        const { data: publicUrlData } = supabase
          .storage
          .from('images')
          .getPublicUrl(fileName)

        image_url = publicUrlData.publicUrl
      }

      const { data, error } = await supabase
        .from('Drinks')
        .insert([{ ...newDrink, image_url }])
        .select()

      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Drinks'])
      navigate('/')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError('All fields are required.')
      return
    }
    setFormError(null)
    mutate({ title, method, rating })
  }

  // 🚫 Block access
  if (accessDenied) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
        <p className="text-gray-600">Only the admin can create new drinks.</p>
      </div>
    )
  }

  return (
    <div className="page create">
      <h2>Add a New Drink</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            placeholder="Coffee, Tea, etc."
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="Describe how to make it"
            className="border p-2 w-full"
          />
        </label>

        <label>
          <span>Rating (1-10):</span>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            className="border p-2 w-full"
          />
        </label>

        <label>
          <span>Choose an Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 w-full"
          />
        </label>

        <button
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isPending ? 'Adding...' : 'Add Drink'}
        </button>

        {formError && <p className="text-red-500">{formError}</p>}
        {isError && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  )
}
