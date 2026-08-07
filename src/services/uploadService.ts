import api from './axiosInstance'
import type { UploadResponse } from '@/types/upload'

export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<UploadResponse>('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
