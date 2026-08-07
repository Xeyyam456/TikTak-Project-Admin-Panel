import { Phone } from 'lucide-react'
import type { LoginPhoneFieldProps } from '@/types/auth'
import styles from '@/pages/Login/styles/PhoneField.module.css'

export default function PhoneField({ register }: LoginPhoneFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${styles.field}`}>
      Telefon
      <div className={`flex items-center ${styles.inputWrap}`}>
        <Phone size={18} className={styles.leadingIcon} />
        <input
          type="tel"
          placeholder="telefon"
          className={`${styles.input} ${styles.hasLeadingIcon}`}
          {...register('phone', { validate: (v) => v.trim().length > 0 })}
        />
      </div>
    </label>
  )
}
