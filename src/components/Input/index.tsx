import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn, fieldClasses } from '@/utils'
import { FormField } from '../FormField'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hint?: string
  error?: string
  startIcon?: ReactNode
  endAdornment?: ReactNode
}

export function Input({
  id,
  label,
  hint,
  error,
  required,
  startIcon,
  endAdornment,
  className,
  ...props
}: InputProps) {
  return (
    <FormField id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        {startIcon && (
          <span className="pointer-events-none absolute inset-y-0 inset-s-3 flex items-center text-slate-400">
            {startIcon}
          </span>
        )}
        <input
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            fieldClasses(!!error),
            'h-11',
            !!startIcon && 'ps-10',
            !!endAdornment && 'pe-11',
            className,
          )}
          {...props}
        />
        {endAdornment && (
          <span className="absolute inset-y-0 inset-e-1.5 flex items-center">{endAdornment}</span>
        )}
      </div>
    </FormField>
  )
}
