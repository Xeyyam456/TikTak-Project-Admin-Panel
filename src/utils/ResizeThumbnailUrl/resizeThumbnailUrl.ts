// The backend's img_url already goes through Cloudflare Image Resizing
// (`/cdn-cgi/image/width=600,height=400,.../...`), but the actual thumbnail
// on screen is 40-56px — without this, the browser downloads a 600x400 image
// just to shrink it to a fraction of that. Rewrites only the width/height
// values inside that segment, leaving quality/format/anything else untouched;
// URLs that don't match (no img_url, an externally hosted image, a future
// upload path) pass through unchanged since .replace() is a no-op without a match.
const CF_IMAGE_SEGMENT = /\/cdn-cgi\/image\/([^/]+)\//

export function resizeThumbnailUrl(url: string, size: number): string {
  return url.replace(CF_IMAGE_SEGMENT, (_match, params: string) => {
    const updated = params.replace(/width=\d+/, `width=${size}`).replace(/height=\d+/, `height=${size}`)
    return `/cdn-cgi/image/${updated}/`
  })
}
