import type { ComponentPropsWithRef } from 'react'
import styles from './FormTextarea.module.css'

type FormTextareaProps = ComponentPropsWithRef<'textarea'>

export default function FormTextarea({ className = '', ...rest }: FormTextareaProps) {
  return <textarea className={`resize-none ${styles.textarea} ${className}`} {...rest} />
}
