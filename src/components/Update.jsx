import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export default function Update() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 🔽 Fetch the drink by ID
  const { data: drink, isLoading, error } = useQuery({
    queryKey: ['drink', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Drinks')
        .select('*')
        .eq('id', Number(id)) // ✅ Cast to number
        .single()

      if (error) throw new Error(error.message)
      return data
    },
  })

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (drink) {
      setTitle(drink.title)
      setMethod(drink.method)
      setRating(drink.rating)
    }
  }, [drink])

  // 🔽 Mutation for updating the drink
  const { mutate, isPending, isError, error: updateError } = useMutation({
    mutationFn: async ({ title, method, rating, imageFile }) => {
      let image_url = drink.image_url // keep existing image if no new file

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) throw new Error(uploadError.message)

        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        image_url = urlData.publicUrl
      }

      // ✅ Update and return single updated row
      const { data, error } = await supabase
        .from('Drinks')
        .update({ title, method, rating, image_url })
        .eq('id', Number(id)) // ✅ make sure types match
        .select()
        .single()

      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: () => {
      // 🔄 Refresh both list + single drink cache
      queryClient.invalidateQueries(['Drinks'])
      queryClient.invalidateQueries(['drink', id])
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
    mutate({ title, method, rating, imageFile })
  }

  if (isLoading) return <p>Loading drink...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="page update">
      <h2>Edit Drink</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 w-full"
          ></textarea>
        </label>

        <label>
          <span>Rating (1-10):</span>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label>
          <span>New Image (optional):</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 w-full"
          />
        </label>

        <button
          disabled={isPending}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isPending ? 'Updating...' : 'Update Drink'}
        </button>

        {formError && <p className="text-red-500">{formError}</p>}
        {isError && <p className="text-red-500">Error: {updateError.message}</p>}
      </form>
    </div>
  )
}
