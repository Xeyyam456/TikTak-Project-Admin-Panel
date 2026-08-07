import type { UseFormRegister } from 'react-hook-form'
import type { LoginFormValues } from './LoginFormValues'

export interface LoginPhoneFieldProps {
  register: UseFormRegister<LoginFormValues>
}
