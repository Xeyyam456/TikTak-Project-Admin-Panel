import { resizeThumbnailUrl } from '@/utils/ResizeThumbnailUrl'
import type { ThumbnailProps } from '@/types/shared'
import styles from './Thumbnail.module.css'

// Rendered pixel size per `size` — also what gets requested (x2 for retina)
// via resizeThumbnailUrl, and set as the <img>'s width/height so the browser
// can reserve layout space and pick a faster decode path.
const PIXEL_SIZE: Record<NonNullable<ThumbnailProps['size']>, number> = { sm: 40, lg: 56 }

export default function Thumbnail({ imageUrl, image, color, size = 'sm' }: ThumbnailProps) {
  const pixelSize = PIXEL_SIZE[size]

  return (
    <span className={`flex items-center justify-center overflow-hidden ${styles.thumb} ${styles[size]}`} style={{ backgroundColor: color }}>
      {imageUrl ? (
        <img
          src={resizeThumbnailUrl(imageUrl, pixelSize * 2)}
          alt=""
          width={pixelSize}
          height={pixelSize}
          loading="lazy"
          decoding="async"
          className={styles.img}
        />
      ) : (
        image
      )}
    </span>
  )
}
