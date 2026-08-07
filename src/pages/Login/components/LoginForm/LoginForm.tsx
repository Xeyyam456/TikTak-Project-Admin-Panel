import Button from '@/shared/components/Button'
import { useLoginForm } from '@/pages/Login/hooks'
import PhoneField from '@/pages/Login/components/PhoneField'
import PasswordField from '@/pages/Login/components/PasswordField'
import styles from '@/pages/Login/styles/LoginForm.module.css'

export default function LoginForm() {
  const { register, submit, isSubmitting, showPassword, togglePassword } = useLoginForm()

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <PhoneField register={register} />
      <PasswordField register={register} showPassword={showPassword} onToggle={togglePassword} />

      <Button type="submit" fullWidth className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Yoxlanılır...' : 'Daxil ol'}
      </Button>
    </form>
  )
}
