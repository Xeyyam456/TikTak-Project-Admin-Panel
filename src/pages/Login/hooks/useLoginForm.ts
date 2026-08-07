import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import type { LoginFormValues } from '@/types/auth'

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues: { phone: '', password: '' } })

  const onSubmit = async ({ phone, password }: LoginFormValues) => {
    try {
      await login(phone.trim(), password)
      toast.success('Hesaba uğurla daxil olundu')
      navigate('/sifarisler', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
    }
  }

  const onInvalid = () => {
    toast.error('Telefon və parolu daxil edin')
  }

  return {
    register,
    submit: handleSubmit(onSubmit, onInvalid),
    isSubmitting,
    showPassword,
    togglePassword: () => setShowPassword((s) => !s),
  }
}
