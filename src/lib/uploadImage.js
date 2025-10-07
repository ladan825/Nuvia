// lib/uploadImage.js
import { supabase } from './supabaseClient'

// This function accepts a file and uploads it to the 'images' bucket
export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`

  // Upload file to Supabase Storage
  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(fileName, file)

  if (error) {
    throw new Error(error.message)
  }

  // Get public URL after upload
  const { data: publicURLData } = supabase
    .storage
    .from('images')
    .getPublicUrl(fileName)

  return publicURLData.publicUrl
}
