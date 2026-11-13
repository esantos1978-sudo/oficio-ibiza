import { supabase } from '@/lib/supabaseClient'
import { slugify } from '@/lib/professionalsAdmin'

const BUCKET = 'professional-images'
const MAX_FILE_SIZE = 6 * 1024 * 1024

export function validateImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('La imagen no puede superar 6 MB.')
  }
}

export async function uploadProfessionalImage(file: File, folder: string) {
  validateImageFile(file)

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeFolder = slugify(folder) || 'profesional'
  const uniqueName =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const path = `${safeFolder}/${Date.now()}-${uniqueName}.${extension}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
