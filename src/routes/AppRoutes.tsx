import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from '@/routes/RequireAuth'
import RedirectIfAuth from '@/routes/RedirectIfAuth'
import AdminLayout from '@/layouts/AdminLayout'
import Loading from '@/shared/components/Loading'

const Login = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Orders = lazy(() => import('@/pages/Protected/Orders'))
const Campaigns = lazy(() => import('@/pages/Protected/Campaigns'))
const Categories = lazy(() => import('@/pages/Protected/Categories'))
const Products = lazy(() => import('@/pages/Protected/Products'))
const Users = lazy(() => import('@/pages/Protected/Users'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/sifarisler" element={<Orders />} />
            <Route path="/kampaniyalar" element={<Campaigns />} />
            <Route path="/kateqoriyalar" element={<Categories />} />
            <Route path="/mehsullar" element={<Products />} />
            <Route path="/istifadeciler" element={<Users />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/sifarisler" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
