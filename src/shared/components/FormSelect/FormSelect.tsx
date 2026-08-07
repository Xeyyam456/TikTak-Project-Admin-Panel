import type { ComponentPropsWithRef } from 'react'
import styles from './FormSelect.module.css'

type FormSelectProps = ComponentPropsWithRef<'select'>

export default function FormSelect({ className = '', children, ...rest }: FormSelectProps) {
  return (
    <select className={`${styles.select} ${className}`} {...rest}>
      {children}
    </select>
  )
}
