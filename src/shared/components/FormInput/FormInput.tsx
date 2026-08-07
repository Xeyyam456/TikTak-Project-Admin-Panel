import type { ComponentPropsWithRef } from 'react'
import styles from './FormInput.module.css'

type FormInputProps = ComponentPropsWithRef<'input'>

export default function FormInput({ className = '', type = 'text', ...rest }: FormInputProps) {
  return <input type={type} className={`${styles.input} ${className}`} {...rest} />
}
