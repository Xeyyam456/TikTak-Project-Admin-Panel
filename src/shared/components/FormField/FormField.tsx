import type { FormFieldProps } from '@/types/shared'
import styles from './FormField.module.css'

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${styles.field}`}>
      {label}
      {children}
    </label>
  )
}
