export const fieldClasses = (hasError: boolean) =>
  [
    'w-full rounded-xl border bg-white px-3 text-sm text-slate-800 transition-colors',
    'placeholder:text-slate-400 focus:outline-none focus:ring-4',
    hasError
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-100',
  ].join(' ')
