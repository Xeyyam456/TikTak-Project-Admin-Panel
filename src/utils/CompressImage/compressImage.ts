// Ekranda heç vaxt bir neçə yüz pikseldən böyük göstərilməyən şəkillər üçün
// telefon/kameradan gələn 4000x3000-lük orijinalı olduğu kimi backend-ə
// göndərmək mənasızdır — canvas üzərindən max ölçüyə qədər kiçildib WebP-ə
// yenidən kodlaşdırırıq ki, fayl ölçüsü minimuma düşsün, gözlə keyfiyyət
// fərqi hiss olunmasın.
const MAX_DIMENSION = 1600
const QUALITY = 0.85

export function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
      const width = Math.round(img.width * scale)
      const height = Math.round(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(file)
        return
      }
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          // Sıxılmış nəticə orijinaldan böyük çıxarsa (məs. artıq kiçik/WebP
          // şəkil) faydası yoxdur — orijinalı olduğu kimi göndəririk.
          if (!blob || blob.size >= file.size) {
            resolve(file)
            return
          }
          const name = file.name.replace(/\.[^./]+$/, '') + '.webp'
          resolve(new File([blob], name, { type: 'image/webp' }))
        },
        'image/webp',
        QUALITY
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(file)
    }

    img.src = objectUrl
  })
}
