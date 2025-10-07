import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [formError, setFormError] = useState(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newDrink) => {
      // 1. Upload image if it exists
      let image_url = null

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('images') // your bucket name
          .upload(fileName, imageFile)

        if (uploadError) throw new Error('Error uploading image')

        // 2. Get public URL
        const { data: publicUrlData } = supabase
          .storage
          .from('images')
          .getPublicUrl(fileName)

        image_url = publicUrlData.publicUrl
      }

      // 3. Insert drink with image_url
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

    mutate({
      title,
      method,
      rating,
    })
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
            placeholder="Coffee, Tea, etc."
            className="border p-2 w-full"
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="Describe how to make it"
            className="border p-2 w-full"
          ></textarea>
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
