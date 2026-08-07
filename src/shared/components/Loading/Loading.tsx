import type { LoadingProps } from '@/types/shared'
import styles from './Loading.module.css'

export default function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${styles.wrap} ${fullScreen ? styles.fullScreen : ''}`}>
      <span className={`flex items-end ${styles.bars}`}>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>
      <span className={styles.text}>Yüklənir...</span>
    </div>
  )
}
