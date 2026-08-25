import api from './axiosInstance'
import type { ProductApi, ProductPayload, ProductsListParams, ProductsListResponse } from '@/types/product'

export const listProducts = (params?: ProductsListParams) =>
  api.get<ProductsListResponse>('/admin/products', { params })
export const createProduct = (payload: ProductPayload) => api.post<ProductApi>('/admin/product', payload)
export const updateProduct = (id: number, payload: ProductPayload) =>
  api.put<ProductApi>(`/admin/products/${id}`, payload)
export const deleteProduct = (id: number) => api.delete<null>(`/admin/products/${id}`)
