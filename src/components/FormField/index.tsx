import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: ReactNode
}

export function FormField({ id, label, hint, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ms-0.5 text-rose-500" aria-hidden="true">
            *
          </span>
        )}{' '}
        {hint && <span className="font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="animate-fade-in text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}
