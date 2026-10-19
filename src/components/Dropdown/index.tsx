import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { cn, fieldClasses } from '@/utils'
import { FormField } from '../FormField'
import { CheckIcon, ChevronDownIcon } from '../Icons'

export interface DropdownOption {
  value: string
  label: string
}

const LIST_MAX_HEIGHT = 240
const LIST_OFFSET = 6

function getListPosition(trigger: HTMLElement): CSSProperties {
  const rect = trigger.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const openUp = spaceBelow < LIST_MAX_HEIGHT + LIST_OFFSET && rect.top > spaceBelow
  return {
    left: rect.left,
    width: rect.width,
    ...(openUp
      ? { bottom: window.innerHeight - rect.top + LIST_OFFSET }
      : { top: rect.bottom + LIST_OFFSET }),
  }
}

interface DropdownProps {
  id: string
  label: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
}

export function Dropdown({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  required,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [position, setPosition] = useState<CSSProperties>({})
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = `${id}-listbox`
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!rootRef.current?.contains(target) && !listRef.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    const update = () => {
      if (triggerRef.current) setPosition(getListPosition(triggerRef.current))
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open])

  useEffect(() => {
    if (!open || activeIndex < 0) return
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  const openList = () => {
    setActiveIndex(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    )
    setOpen(true)
  }

  const select = (option: DropdownOption) => {
    onChange(option.value)
    setOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault()
        openList()
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => (index + 1) % options.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => (index - 1 + options.length) % options.length)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (options[activeIndex]) select(options[activeIndex])
        break
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <FormField id={id} label={label} error={error} required={required}>
      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={handleKeyDown}
          className={cn(
            fieldClasses(!!error),
            'flex h-11 cursor-pointer items-center justify-between gap-2 text-start',
            open && !error && 'border-brand-500 ring-4 ring-brand-100',
          )}
        >
          <span className={cn('truncate', !selected && 'text-slate-400')}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDownIcon
            width={18}
            height={18}
            className={cn('shrink-0 text-slate-400 transition-transform', open && 'rotate-180')}
          />
        </button>

        {open &&
          createPortal(
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={id}
              style={position}
              className="fixed z-50 max-h-60 animate-fade-in overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value
                return (
                  <li
                    key={option.value}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onPointerEnter={() => setActiveIndex(index)}
                    onClick={() => select(option)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      index === activeIndex && 'bg-slate-100',
                      isSelected ? 'font-medium text-brand-700' : 'text-slate-700',
                    )}
                  >
                    {option.label}
                    {isSelected && <CheckIcon width={16} height={16} className="shrink-0" />}
                  </li>
                )
              })}
            </ul>,
            document.body,
          )}
      </div>
    </FormField>
  )
}
