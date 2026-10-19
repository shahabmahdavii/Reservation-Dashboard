import { useId, useMemo, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICE_TYPES, type NewReservationInput, type Reservation } from '@/types'
import { hasErrors, PHONE_LENGTH, toDigitsOnly, todayISO, validateReservation } from '@/utils'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { PhoneIcon, UserIcon } from '../Icons'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { Textarea } from '../Textarea'

interface NewReservationModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (input: NewReservationInput) => Reservation
  onError: (message: string) => void
}

type Field = keyof NewReservationInput
type Touched = Partial<Record<Field, boolean>>

const EMPTY_FORM: NewReservationInput = {
  customerName: '',
  phone: '',
  service: '' as NewReservationInput['service'],
  date: '',
  time: '',
  notes: '',
}

export function NewReservationModal({
  open,
  onClose,
  onSubmit,
  onError,
}: NewReservationModalProps) {
  const { t } = useTranslation()
  const formId = useId()
  const [values, setValues] = useState<NewReservationInput>(EMPTY_FORM)
  const [touched, setTouched] = useState<Touched>({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validateReservation(values), [values])

  const handleClose = () => {
    setValues(EMPTY_FORM)
    setTouched({})
    setSubmitted(false)
    onClose()
  }

  const touch = (name: Field) => setTouched((current) => ({ ...current, [name]: true }))

  const setField = (name: Field, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    touch(name)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setField(e.target.name as Field, e.target.value)

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) =>
    setField('phone', toDigitsOnly(e.target.value, PHONE_LENGTH))

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    touch(e.target.name as Field)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (hasErrors(errors)) {
      onError(t('form.fixErrors'))
      return
    }
    onSubmit(values)
    handleClose()
  }

  const errorText = (field: Field) => {
    const error = errors[field]
    return error && (submitted || touched[field]) ? t(error) : undefined
  }
  const serviceOptions = SERVICE_TYPES.map((s) => ({
    value: s,
    label: t(`reservation.services.${s}`),
  }))

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t('form.title')}
      description={t('form.subtitle')}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" form={formId}>
            {t('form.submit')}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          id="customerName"
          name="customerName"
          required
          label={t('reservation.fields.customerName')}
          placeholder={t('form.customerNamePlaceholder')}
          value={values.customerName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorText('customerName')}
          startIcon={<UserIcon width={18} height={18} />}
          autoComplete="name"
          autoFocus
        />
        <Input
          id="phone"
          name="phone"
          required
          type="tel"
          inputMode="numeric"
          maxLength={PHONE_LENGTH}
          label={t('reservation.fields.phone')}
          placeholder={t('form.phonePlaceholder')}
          value={values.phone}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          error={errorText('phone')}
          startIcon={<PhoneIcon width={18} height={18} />}
          autoComplete="tel"
          className="[unicode-bidi:plaintext]"
        />
        <Dropdown
          id="service"
          required
          label={t('reservation.fields.service')}
          placeholder={t('form.servicePlaceholder')}
          options={serviceOptions}
          value={values.service}
          onChange={(value) => setField('service', value)}
          error={errorText('service')}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="date"
            name="date"
            required
            type="date"
            min={todayISO()}
            label={t('reservation.fields.date')}
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errorText('date')}
          />
          <Input
            id="time"
            name="time"
            required
            type="time"
            label={t('reservation.fields.time')}
            value={values.time}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errorText('time')}
          />
        </div>
        <Textarea
          id="notes"
          name="notes"
          label={t('reservation.fields.notes')}
          hint={t('form.optional')}
          placeholder={t('form.notesPlaceholder')}
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    </Modal>
  )
}
