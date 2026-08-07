import 'axios'

// `original.skipAuthRetry`/`original._retry` in axiosInstance.ts's handleError
// aren't real Axios fields — augment once here, reused by every service call.
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}
