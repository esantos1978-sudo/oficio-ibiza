import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient'
import {
  normalizeProfessional,
  type AdminProfessional,
} from '@/lib/professionalsAdmin'

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<AdminProfessional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase no está configurado. Revisa las variables de entorno.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    const { data, error: queryError } = await supabase
      .from('professionals')
      .select('*')
      .order('created_at', { ascending: false })

    if (queryError) {
      setError(queryError.message)
      setLoading(false)
      return
    }

    setProfessionals(
      (data ?? []).map((row) => normalizeProfessional(row as Record<string, unknown>)),
    )
    setLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { professionals, loading, error, reload }
}
