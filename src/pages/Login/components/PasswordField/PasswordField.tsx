import { Lock, Eye, EyeOff } from 'lucide-react'
import Button from '@/shared/components/Button'
import type { LoginPasswordFieldProps } from '@/types/auth'
import styles from '@/pages/Login/styles/PasswordField.module.css'

export default function PasswordField({ register, showPassword, onToggle }: LoginPasswordFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${styles.field}`}>
      Parol
      <div className={`flex items-center ${styles.inputWrap}`}>
        <Lock size={18} className={styles.leadingIcon} />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="**********"
          className={`${styles.input} ${styles.hasLeadingIcon} ${styles.hasTrailingIcon}`}
          {...register('password', { validate: (v) => v.trim().length > 0 })}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={onToggle}
          className={styles.trailingIconBtn}
          aria-label={showPassword ? 'Parolu gizlət' : 'Parolu göstər'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
    </label>
  )
}
