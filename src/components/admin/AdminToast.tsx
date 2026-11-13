import { useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AdminToastState {
  type: 'success' | 'error'
  message: string
}

interface AdminToastProps {
  toast: AdminToastState | null
  onClose: () => void
}

export function AdminToast({ toast, onClose }: AdminToastProps) {
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(onClose, 4500)
    return () => window.clearTimeout(timer)
  }, [onClose, toast])

  if (!toast) return null

  return (
    <div
      role="status"
      className={cn(
        'fixed bottom-5 right-5 z-[80] flex max-w-[calc(100vw-2.5rem)] items-start gap-3 border px-4 py-3 text-[12px] shadow-[0_20px_60px_-30px_rgba(26,26,26,0.4)]',
        toast.type === 'success'
          ? 'border-ink/15 bg-background text-ink'
          : 'border-clay/25 bg-[#FBF1ED] text-clay-deep',
      )}
    >
      {toast.type === 'success' && (
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E7EFE5] text-[#3E6847]">
          <Check className="h-3 w-3" strokeWidth={2} />
        </span>
      )}
      <p className="max-w-[36ch] leading-relaxed">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center text-muted transition-colors hover:text-ink"
        aria-label="Cerrar aviso"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
