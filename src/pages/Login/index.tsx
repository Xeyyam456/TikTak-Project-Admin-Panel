import loginImg from '@/assets/images/login-img.webp'
import { useTitle } from '@/shared/hooks/useTitle'
import LoginForm from './components/LoginForm'
import styles from '@/pages/Login/styles/Login.module.css'

export default function Login() {
  useTitle('Giriş')
  return (
    <div className={`overflow-hidden ${styles.page}`}>
      <div className={`flex flex-col ${styles.left}`}>
        <h1 className={styles.brand}>TIK TAK ADMİN</h1>
        <div className={`flex items-center justify-center ${styles.illustrationWrap}`}>
          <img src={loginImg} alt="" className={styles.illustration} />
        </div>
      </div>

      <div className={`flex items-center justify-center ${styles.right}`}>
        <div className={`flex flex-col gap-6 ${styles.formWrap}`}>
          <h2 className={`text-center ${styles.formTitle}`}>Admin Panel</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
