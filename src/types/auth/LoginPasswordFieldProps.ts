import type { UseFormRegister } from 'react-hook-form'
import type { LoginFormValues } from './LoginFormValues'

export interface LoginPasswordFieldProps {
  register: UseFormRegister<LoginFormValues>
  showPassword: boolean
  onToggle: () => void
}
