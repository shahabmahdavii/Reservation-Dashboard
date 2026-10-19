import type { TextareaHTMLAttributes } from 'react'
import { cn, fieldClasses } from '@/utils'
import { FormField } from '../FormField'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  hint?: string
  error?: string
}

export function Textarea({ id, label, hint, error, className, ...props }: TextareaProps) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={3}
        className={cn(fieldClasses(!!error), 'resize-none py-2.5', className)}
        {...props}
      />
    </FormField>
  )
}
